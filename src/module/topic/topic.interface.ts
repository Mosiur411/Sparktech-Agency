import { Types } from "mongoose";
export interface ITopic {
    title: string;
    teacher: Types.ObjectId;
    content: string;
    quiz?: {
        question: string;
        options: string[];
        correctAnswer: string;
    };
}


