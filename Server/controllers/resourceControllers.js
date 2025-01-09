import resourceModel from "../models/resource.js";
import userModel from "../models/userModel.js"; // Updated import
import jwt from "jsonwebtoken";

// Add resource --admin
export const addResource = async (req, res) => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header is missing. Please log in again." });
        }

        // Token should be in the format "Bearer <token>"
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Authorization token is missing. Please log in again." });
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        // Find the user
        const user = await userModel.findById(userId);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "You are not authorized to add resources" });
        }

        // Check for duplicate resource
        const existingResource = await resourceModel.findOne({ url: req.body.link });
        if (existingResource) {
            return res.status(400).json({ message: "This resource already exists" });
        }

        // Add the resource
        const resource = new resourceModel({
            url: req.body.link,
            title: req.body.title,
            description: req.body.desc,
            author: req.body.author,
            category: req.body.category,
            type: req.body.type,
            image: req.body.image,
        });

        await resource.save();
        res.status(200).json({ message: "Resource added successfully" });
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token. Please log in again." });
        }
        res.status(500).json({ message: error.message });
    }
};
