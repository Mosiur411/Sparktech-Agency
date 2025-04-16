import { Types } from "mongoose";
import { IUser } from "../user/user.interface";
export interface IStudentUser extends IUser {
    role: 'student';
    student_id: string;
    name: string;
    user: Types.ObjectId;
    gmail:string;
    contact:string;
    address: string;
    passwoard:string;
    program: string;
    year_of_study: number;
    profile_picture?:string;
    semester: string;
    preferences: {
      language: string;
      notification_preferences: {
        email_notifications: boolean;
        sms_notifications: boolean;
        push_notifications: boolean;
      };
    };
    academic_info: {
      current_gpa: number;
      major: string;
      minor?: string;
    };
    emergency_contact: {
      name: string;
      relationship: string;
      contact: string;
    };
    status: "unblocked" | "blocked";
  }