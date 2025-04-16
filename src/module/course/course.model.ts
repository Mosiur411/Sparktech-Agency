import mongoose, { Schema } from "mongoose";
import { ICourse } from "./course.interface";

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String },
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likes: { type: Number, default: 0 },
  feedbacks: [
    {
      student: { type: Schema.Types.ObjectId, ref: 'User' },
      message: String,
    }
  ]
  });
  
  export const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);