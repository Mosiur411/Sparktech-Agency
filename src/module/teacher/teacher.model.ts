import mongoose, { Schema } from "mongoose";
import { ITeacher } from "./teacher.interface";


const TeacherSchema = new Schema<ITeacher>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    bio: {
        type: String,
        default: ''
    },
    expertise: [
        {
            type: String
        }
    ],
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            default: []
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            default: []
        }
    ]
});


const TeacherModel = mongoose.model<ITeacher>("Teachers", TeacherSchema);

export default TeacherModel;
