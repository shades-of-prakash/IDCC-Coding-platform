import  express from 'express';
const Router = express.Router();
import authRoutes from "./authRoutes.js"
import { checkUser, GenerateRandomPassword } from '../controllers/authController.js';


Router.use('/login', authRoutes);

export default Router;
