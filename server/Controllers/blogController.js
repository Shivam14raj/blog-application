import blogModel from "../models/blogModel.js";
import mongoose from "mongoose";

// get all blog 
export const getAllBlogs = async(req, res) =>{
     try {
       const blogs = await blogModel.find({}); // {} mtlb find many 

       if(!blogs){
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
    const {title, description, image} = req.body; 

    if(!title || !description || !image){
        return res.status(400).json({
            success: false, 
            message: "All fields are required",
        })
    } 

    const newblog = new blogModel({title, description, image})
    await newblog.save(); 

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

    const blog = await blogModel.findByIdAndUpdate(id, {...req.body}, {new:true})

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
export const deleteBlogs = async(req, res) =>{
   try {
     const {id} = req.params; 

     const deleteblog = await blogModel.findByIdAndDelete(id); 

     if(!deleteblog){
        return res.status(404).json({
            success: true, 
            message: "blog not found to delete"
        })
     } 

     return res.status(200).json({
        success: true, 
        message: "blog has been deleted successfully"
     }) 

     } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "server error in deleting all blogs"
        })
     }
}  

// delete all blogs 
export const deleteAllBlogs = async(req, res) =>{
   try {
    const deletemanyblog = await blogModel.deleteMany({}); 

    if(!deletemanyblog){
        return res.status(404).json({
            success: false, 
            message: "no blog has been found to delete"
        })
    } 

    return res.status(200).json({
        success: true, 
        message: "all blog has been deleted successfully"
    })

   } catch (error) {
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
        return res.status(400).json({
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
