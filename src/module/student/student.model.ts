import mongoose, { Schema } from "mongoose";
import { IStudentUser } from "./student.interface";
import bcrypt from 'bcrypt';
import config from "../../config";


const StudentUserSchema = new Schema<IStudentUser>({
  role: { type: String, enum: ["student"], required: true },
  student_id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  name: { type: String, required: true },
  gmail: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  program: { type: String,  },
  year_of_study: { type: Number,  },
  profile_picture: { type: String },
  semester: { type: String,  },
  preferences: {
    language: { type: String,  },
    notification_preferences: {
      email_notifications: { type: Boolean,  },
      sms_notifications: { type: Boolean, },
      push_notifications: { type: Boolean, },
    },
  },
  academic_info: {
    current_gpa: { type: Number,  },
    major: { type: String,  },
    minor: { type: String },
  },
  emergency_contact: {
    name: { type: String,  },
    relationship: { type: String,  },
    contact: { type: String,  },
  },
  status: {
    type: String,
    enum: ['unblocked', 'blocked'],
    default: 'unblocked',
  },
});


StudentUserSchema.pre("save", async function (next) {
    const existingStudent = await mongoose.model("Students").findOne({
      $or: [{ student_id: this.student_id }, { gmail: this.gmail }],
    });
    if (existingStudent) {
      const error = new Error("Student with this ID or Gmail already exists");
      return next(error);
    }
  
    next();
  });
  StudentUserSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    next();
  });
  
  


const StudentUserModel = mongoose.model<IStudentUser>("Students", StudentUserSchema);

export default StudentUserModel;
