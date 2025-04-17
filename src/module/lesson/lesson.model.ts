import mongoose, { Schema } from "mongoose";
import { ILesson } from "./lesson.interface";

const LessonSchema = new Schema<ILesson>({
    title: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topics' }],
});

export const LessonModel = mongoose.model<ILesson>("Lesson", LessonSchema)