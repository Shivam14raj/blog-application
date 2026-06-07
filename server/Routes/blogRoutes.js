import express from 'express'
import { createBlogs, deleteAllBlogs, deleteBlogs, getAllBlogs, getSingleBlogs, getUserBlogs, updateBlogs } from '../Controllers/blogController.js';

const router = express.Router(); 

// routes 
// get all blogs
router.get('/all-blogs', getAllBlogs )

// create a blog 
router.post('/create-blog', createBlogs)

// update a blog 
router.put('/update-blog/:id', updateBlogs)

// delete a blog 
router.delete('/delete-blog/:id', deleteBlogs)

// delete all blogs 
router.delete('/delete-all-blogs', deleteAllBlogs) 

// get single blog 
router.get('/get-blog/:id', getSingleBlogs) 

// get specifc user blog 
router.get("/user/:id", getUserBlogs);

export default router; 