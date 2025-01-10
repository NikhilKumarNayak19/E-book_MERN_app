import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import mongoose from 'mongoose';

// Register
export const register = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Set default isAdmin to false if not provided
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdmin === true, // Explicitly set to false if not true
        });

        await user.save();

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Email template
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: user.isAdmin ? "Welcome Admin to E-book!" : "Welcome to E-book!",
            text: `Hello ${name},\n\nWelcome to the E-book platform${user.isAdmin ? " as an Admin" : ""}! You have successfully registered with the email: ${email}. We're excited to have you on board.\n\nBest Regards,\nE-book Team`,
        };

        // Send email
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error.message);
            return res.json({ success: false, message: "Registration successful, but email sending failed." });
        }

        return res.json({ success: true, message: "User registered successfully", token });
    } catch (error) {
        console.error("Error during registration:", error.message);
        return res.json({ success: false, message: "Error in registration", error: error.message });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "Email and Password are required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid Email or Password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Email or Password" });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, message: "Login Successful", token });
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.json({ success: false, message: error.message });
    }
};

// Logout
export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        console.error("Error during logout:", error.message);
        return res.json({ success: false, message: error.message });
    }
};

// Send OTP to email
export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.userId; // From middleware like userAuth

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.json({ success: false, message: "Invalid or missing User ID" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpires = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your OTP for account verification is ${otp}. Please verify within 24 hours.`,
        };

        try {
            await transporter.sendMail(mailOptions);
            return res.json({ success: true, message: "OTP sent successfully" });
        } catch (error) {
            console.error("Error sending OTP email:", error.message);
            return res.json({ success: false, message: "Failed to send OTP email" });
        }
    } catch (error) {
        console.error("Error in sendVerifyOtp:", error.message);
        return res.json({ success: false, message: "An error occurred while processing your request" });
    }
};


// Verify email with OTP
export const verifyemail = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId; // Support both sources
        const { otp } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.verifyOtp || user.verifyOtp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOtpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP has expired" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = null;
        user.verifyOtpExpires = null;

        await user.save();

        return res.status(200).json({ success: true, message: "Account verified successfully" });

    } catch (error) {
        console.error("Error during email verification:", error);
        return res.status(500).json({ success: false, message: "An error occurred during verification" });
    }
};

//Check user is authenticated or not
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true, message: "Authenticated", user: req.user });
        
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

//sent password reset otp
export const sendResetOtp = async (req, res) => {
    const {email}= req.body;
    if(!email){
        return res.json({success: false, message: "Email is required"});
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "User not found"});  
        }


        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
            user.resetOtpExpireAt = Date.now() + 15 * 60 *  1000; // Expiry time in 15 minutes

            await user.save();
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: "Password Reset OTP",
                text: `Your OTP for password reset is ${otp}. Please reset within 15 minutes.`
            };
            await transporter.sendMail(mailOptions);
            return res.json({success: true, message: "OTP sent successfully to your email"});
        
    } catch (error) {
        return res.json({success: false, message: error.message});
    }

}

//reset password

export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword){
        return res.json({success: false, message: "Email, OTP and New Password are required"});
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        if(user.resetOtp !== otp || user.resetOtp === null){
            return res.json({success: false, message: "Invalid OTP"});
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success: false, message: "OTP has expired"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
        user.password = hashedPassword; // Assign the hashed password to the user's password field
        user.resetOtp = null;
        user.resetOtpExpireAt = 0;
        await user.save();
        return res.json({success: true, message: "Password has been reset successful"});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};

//Admin Login
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and Password are required" });
    }

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid Email or Password" });
        }

        // Check if the user is an admin
        if (!user.isAdmin) {
            return res.json({ success: false, message: "The provided email does not belong to an admin." });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Email or Password" });
        }

        // Generate an OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
        await user.save();

        // Send the OTP to the admin's email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Admin Login OTP",
            text: `Hello Admin,\n\nYour OTP for logging into the admin panel is ${otp}. Please use this OTP within 15 minutes to complete your login.\n\nBest Regards,\nE-book Team`
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('OTP email sent to admin');
        } catch (emailError) {
            console.error('Error sending OTP email:', emailError);
            return res.json({ success: false, message: "Failed to send OTP email" });
        }

        // Generate a JWT token for the admin
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.json({ success: true, message: "Admin login successful. OTP sent to your email.", token });

    } catch (error) {
        console.error("Error during admin login:", error);
        return res.json({ success: false, message: "An error occurred during admin login" });
    }
};

//Admin otp verification 

export const adminVerifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    // Validate inputs
    if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    try {
        // Find the admin user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        // Check if the user is an admin
        if (!user.isAdmin) {
            return res.status(403).json({ success: false, message: "Access denied. Not an admin account." });
        }

        // Verify OTP
        if (user.verifyOtp !== otp || !user.verifyOtp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        // Check if OTP has expired
        if (user.verifyOtpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP has expired" });
        }

        // Clear OTP fields after successful verification
        user.verifyOtp = null;
        user.verifyOtpExpires = null;
        await user.save();

        // Generate a new JWT token for the admin
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({
            success: true,
            message: "Admin OTP verified successfully. Login complete.",
            token,
        });
    } catch (error) {
        console.error("Error during admin OTP verification:", error);
        return res.status(500).json({ success: false, message: "An error occurred during OTP verification" });
    }
};
