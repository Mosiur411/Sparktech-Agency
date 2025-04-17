import mongoose, { Schema } from "mongoose";
import { IStudent } from "./student.interface";


const StudentSchema = new Schema<IStudent>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  enrolledCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      default: []
    }
  ],
  followedTeachers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      default: []
    }
  ],
  progress: [
    {
      course: { type: Schema.Types.ObjectId, ref: 'Course' },
      lesson: { type: Schema.Types.ObjectId, ref: 'Lesson' },
      completedTopics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
      lastVisited: { type: Date, default: Date.now }
    }
  ]
});



const StudentModel = mongoose.model<IStudent>("Students", StudentSchema);

export default StudentModel;
