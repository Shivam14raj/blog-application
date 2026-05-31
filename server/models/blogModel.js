import mongoose from 'mongoose'; 

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        require: [true, 'title is required']
    }, 
    description:{
      type: String, 
      require: [ true, "description is required"] 
    }, 
    image: {
        type: String, 
        require: [true, 'image is required']
    }
}, {timestamps: true})


const blogModel = mongoose.model('Blog', blogSchema)

export default blogModel; 