import express from 'express'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'

// get all user 
export const getAllUsers =  async(req, res) =>{
    try {
     const allusers = await userModel.find({}); 

     return res.status(200).json({
        userCount : allusers.length, 
        success: true, 
        message: "all user data fetched sucessfully", 
        allusers  
     })
        
    } catch (error) {
        console.log(error); 
        return res.status(500).json({
            success: false, 
            message: "Error in getting all users", 
            error
        })
    }
} 

// register
export const registerController = async (req, res)=>{
    try {
      const {username, email, password} = req.body; 

      if(!username || !email || !password){
         return res.status(400).json({
            success: false, 
            message: "All fields are required"
         })
      } 

      // now check whether the same email is not in db or not 
      const existingUser = await userModel.findOne({email}); 
      
      if(existingUser){
        return res.status(401).json({
            success: false, 
            message: "user already exist"
        })
      } 
      
      // password hashing 
      const hashedPassword = await bcrypt.hash(password, 10); 

      // now save user 
      const user = new userModel({username, email, password:hashedPassword})
      await user.save() 

      return res.status(201).json({
        success: true, 
        message: "User created succesfully", 
        user
      })

    } 
    catch (error) {
        console.log(error) 
        return res.status(500).json({
            message: "error in register controller", 
            success: false, 
            error
        })
    }
    
}


// login
export const loginController = async(req, res) =>{
    try { 
     const {email, password} = req.body; 
     if(!email || !password){
        return res.status(400).json({
            success: false, 
            message: "Please provide email & password", 
        }) 
     } 

     // check whether register or not 
     const user = await userModel.findOne({email}); 

     if(!user){
        return res.status(400).json({
            success: false, 
            message: "User does not exist"
        })
     } 
     
     // check password too 
     const isMatchpassword = await bcrypt.compare(password, user.password);

     if(!isMatchpassword){
        return res.status(401).json({
            success: false, 
            message: "password is incorrect"
        })
     } 
    
     return res.status(200).json({
        success: true, 
        message: "Login successfull",
        user
     })   
      
    } catch (error) {
      console.log(error); 
      return res.status(500).json({
        success: false, 
        message: "error in login controller", 
        error
      })  
    }
}; 