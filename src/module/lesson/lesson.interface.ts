import { Types } from "mongoose";

export interface ILesson {
    title: string;
    description?: string;
    teacher: Types.ObjectId;
    topics: Types.ObjectId[];
}


