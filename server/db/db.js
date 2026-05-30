import mongoose from "mongoose";
import colors from 'colors'

const  conncetDB = async ()=>{
     try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connceted successfully".bgRed); 
     } catch (error) {
        console.log(error)
     }    
} 

export default conncetDB; 