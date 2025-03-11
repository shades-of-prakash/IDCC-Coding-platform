import express from 'express';
const router = express.Router();

import {checkUser, GenerateRandomPassword, LoginExistingUser, LoginNewUser} from '../controllers/authController.js';

router.post('/newuser', LoginNewUser);
router.post("/existinguser",LoginExistingUser);
router.get("/checkuser",checkUser)
router.get('/generaterandompassword',GenerateRandomPassword)

export default router; 
