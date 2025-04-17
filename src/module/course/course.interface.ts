import { Types } from "mongoose";

export interface ICourse {
  title: string;
  description: string;
  teacher: Types.ObjectId;
  lessons: Types.ObjectId[];
  likes: { student: Types.ObjectId; message: string }[];
  feedbacks: { student: Types.ObjectId; message: string }[];
  }