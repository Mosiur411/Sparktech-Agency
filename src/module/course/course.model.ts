import mongoose, { Schema } from "mongoose";
import { ICourse } from "./course.interface";

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String },
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  enrolledStudents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    default: []
  },
  feedbacks: [
    {
      student: { type: Schema.Types.ObjectId, ref: 'User' },
      message: String,
    }
  ]

});

export const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);