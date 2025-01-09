import mongoose from "mongoose";

const history = new mongoose.Schema({
    user: {
        type: moongoose.Types.ObjectId,
        ref: "user",
    },
    resource: {
        type: moongoose.Types.ObjectId,
        ref: "resources",
    },
    status:{
        type: String,
        enum: ["complete", "reading"],
        default: "reading",
    }
},({timestamps:true})
);
const historyModel = mongoose.model.history || mongoose.model("history", historySchema);

export default historyModel;