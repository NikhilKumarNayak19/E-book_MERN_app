import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// Get user data
export const getUserData = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization header is missing" });
    }

    // Token should be in the format "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization token is missing" });
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    console.log("User ID from token:", userId); // Debugging log

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID" });
    }

    // Fetch user from the database
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Respond with user data
    res.json({
      success: true,
      userData: {
        avatar: user.avatar,
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isAccountVerified: user.isAccountVerified,
        history: user.history,
        readLater: user.readLater,
      },
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token. Please log in again." });
    }

    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
