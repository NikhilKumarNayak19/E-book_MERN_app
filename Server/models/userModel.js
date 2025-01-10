import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        verifyOtp: { type: String, default: "" },
        verifyOtpExpireAt: { type: Number, default: 0 },
        isAccountVerified: { type: Boolean, default: false },
        isAdmin: { type: Boolean, default: false },
        resetOtp: { type: String, default: "" },
        resetOtpExpireAt: { type: Number, default: 0 },
        readLater: [
            {
                type: mongoose.Schema.Types.ObjectId, // Array of ObjectId references
                ref: "resource",
                default: [], // Initialize as an empty array
            },
        ],
        history: [
            {
                type: mongoose.Schema.Types.ObjectId, // Array of ObjectId references
                ref: "resource",
                default: [], // Initialize as an empty array
            },
        ],
        avatar: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
    },
    { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
