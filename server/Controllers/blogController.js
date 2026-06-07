import blogModel from "../models/blogModel.js";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";

// get all blog 
export const getAllBlogs = async(req, res) =>{
     try {
       const blogs = await blogModel.find({}); // {} mtlb find many 

       if(blogs.length === 0){
          return res.status(200).json({
             success: false, 
             message: "No blogs are found"
          })
       } 

       return res.status(200).json({
         success: true, 
         message: "blogs are found", 
         blogCount: blogs.length, 
         blogs
       })    

     } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "server error in getting all blogs"
        })
     }
} 

// create a blog 
export const createBlogs = async(req, res) =>{
   try {
    const {title, description, image, user} = req.body; 
    // validation
    if(!title || !description || !image || !user){
        return res.status(400).json({
            success: false, 
            message: "All fields are required",
        })
    } 

    const existingUser = await userModel.findById(user); 
    // user validaton
    if(!existingUser){
        return res.status(404).json({
            success: false, 
            message: "User id is required to create a blog"
        })
    }

    const newblog = new blogModel({title, description, image, user})
    // save everything or save nothing (all or nothing); if error then rollback 
    const session = await mongoose.startSession() 
    session.startTransaction()
    await newblog.save({session})
    existingUser.blogs.push(newblog)
    await existingUser.save({session})
    await session.commitTransaction() 


    return res.status(201).json({
        success: true,
        message: "new blog is created", 
        newblog    
    })
     } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "server error in creating all blogs"
        })
     }
}  

// update a blog 
export const updateBlogs = async(req, res) =>{
    try {
    const {id} = req.params; 

    const {title, description, image} = req.body; 

    // validatate id 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false, 
            message: "invalid blog id"
        })
    }

    const blog = await blogModel.findByIdAndUpdate(id, {...req.body}, {new:true})

    // blog validation
    if(!blog){
        return res.status(400).json({
            success: false, 
            message: "No blog is found"
        })
    }

    return res.status(200).json({
        success: true, 
        message: "blog has been updated successfully", 
        blog
    })

     } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "server error in updating all blogs"
        })
     }
}     

// delete a blog 
export const deleteBlogs = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { id } = req.params

    const deleteblog = await blogModel
      .findByIdAndDelete(id, { session })
      .populate("user")

    if (!deleteblog) {
      await session.abortTransaction()
      session.endSession()
      return res.status(404).json({
        success: false,
        message: "blog not found to delete"
      })
    }

    // 🔒 VERY IMPORTANT SAFETY CHECK
    if (deleteblog.user && deleteblog.user.blogs) {
      deleteblog.user.blogs.pull(deleteblog._id)
      await deleteblog.user.save({ session })
    }

    await session.commitTransaction()
    session.endSession()

    return res.status(200).json({
      success: true,
      message: "blog has been deleted successfully"
    })

  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "server error in deleting blog"
    })
  }
}  

// delete all blogs 
export const deleteAllBlogs = async(req, res) =>{
   const session = mongoose.startSession(); 
   session.startTransaction(); 
   try {
    const deletemanyblog = await blogModel.deleteMany({}, {session}); 

   if(deletemanyblog.deletedCount === 0){
      (await session).abortTransaction(); 
      session.endSession(); 

      return res.status(404).json({
        success: false, 
        message: "No blog is found to be deleted"
      })
   } 

    // 🔥 IMPORTANT: clear blogs array of all users
    await userModel.updateMany(
      {},
      { $set: { blogs: [] } },
      { session }
    ) 

    (await session).commitTransaction(); 
    session.endSession(); 

    return res.status(200).json({
        success: true, 
        message: "all blog has been deleted successfully"
    })

   } catch (error) {
     (await session).abortTransaction(); 
     session.endSession(); 
     console.log(error); 
     return res.status(500).json({
        success: false, 
        message: " server error in deleting blogs"
     })
   }
}

// fetch a single blog 
export const getSingleBlogs = async(req, res) =>{
   try {
    const {id} = req.params; 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success: false, 
            message: "invalid id"
        })
    } 

    const blogToGet = await blogModel.findById(id); 

    if(!blogToGet){
        return res.status(400).json({
            success: false, 
            message: "blog not found"
        })
    } 

    return res.status(200).json({
        success: true, 
        message: "blog is found",
        data: blogToGet
    })


     } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "server error in getting single blogs"
        })
     }
} 

// get all blogs of a specific user
export const getUserBlogs = async (req, res) => {
  try {
    const { id } = req.params; // user id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const userBlogs = await blogModel.find({ user: id });

    if (userBlogs.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No blogs found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      blogCount: userBlogs.length,
      blogs: userBlogs,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error in getting user blogs",
    });
  }
};