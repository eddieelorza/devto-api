import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        minLenght: 3,
        maxLenght: 100,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true
    },
});

const Comment = mongoose.model("comment", commentSchema);

export { Comment };
