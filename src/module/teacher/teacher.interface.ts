import { Types } from "mongoose";
export interface ITeacher{
    user: Types.ObjectId;
    bio: string;
    expertise: string[];
    courses: Types.ObjectId[];
    followers: Types.ObjectId[];
}