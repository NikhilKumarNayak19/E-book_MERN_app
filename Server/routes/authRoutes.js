import express from 'express';
import { adminLogin, adminVerifyOtp,  getUserById, isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyemail } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyemail);
authRouter.post('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp',  sendResetOtp);
authRouter.post('/reset-password',  resetPassword);
authRouter.post('/admin',  adminLogin);
authRouter.post('/admin-otp',  adminVerifyOtp);
authRouter.get('/getuserbyid', getUserById);


export default authRouter;