import express from 'express';
import dotenv from 'dotenv' 
import cors from 'cors'
import morgan  from 'morgan';
import colors from 'colors'
import conncetDB from './db/db.js';
import userRoute from './Routes/userRoutes.js'
import blogRoute from './Routes/blogRoutes.js'



dotenv.config(); 
conncetDB(); 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 
app.use(morgan('dev')); 


// routes 
// user routes
app.use('/api/v1/user', userRoute);

// blog routes 
app.use('/api/v1/blog', blogRoute)


const PORT = process.env.PORT

app.listen(PORT, (req, res)=>{
    console.log(`server is started at ${PORT}`.bgMagenta)
})  