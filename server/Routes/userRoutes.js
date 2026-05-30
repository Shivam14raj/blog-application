import express from 'express'
import { getAllUsers, loginController, registerController } from '../Controllers/userController.js';

// creating router
const router = express.Router()

// routes
router.get('/all-users', getAllUsers); 
router.post('/register', registerController);
router.post('/login', loginController)


export default router;  