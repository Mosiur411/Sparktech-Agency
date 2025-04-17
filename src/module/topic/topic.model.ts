import mongoose, { Schema } from "mongoose";
import { ITopic } from "./topic.interface";

const TopicSchema = new Schema<ITopic>({
    title: { type: String, required: true },
    teacher: { 
        type: Schema.Types.ObjectId, 
        ref: "User", required: true },
    content: { type: String, required: true },
    quiz: {
        question: { type: String },
        options: [{ type: String }],
        correctAnswer: { type: String },
    },
});



export const TopicModel = mongoose.model<ITopic>("Topics", TopicSchema);
