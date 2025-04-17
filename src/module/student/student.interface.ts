import { Types } from "mongoose";


export interface IProgress {
  course: Types.ObjectId;
  lesson: Types.ObjectId;
  completedTopics: Types.ObjectId[];
  lastVisited: Date;
}

export interface IStudent {
  user: Types.ObjectId;
  enrolledCourses: Types.ObjectId[];
  followedTeachers: Types.ObjectId[];
  progress: IProgress[];
}