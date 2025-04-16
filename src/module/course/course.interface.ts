import { Types } from "mongoose";

export interface ICourse {
  title: string;
  description: string;
  teacher: Types.ObjectId;
  students: Types.ObjectId[];
  likes: number;
  feedbacks: { student: Types.ObjectId; message: string }[];
  }