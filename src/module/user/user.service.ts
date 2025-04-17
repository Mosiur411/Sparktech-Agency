import mongoose from 'mongoose';
import { UserModel } from './user.model';
import { IUser } from './user.interface';
import { USER_ROLE } from './user.constants';
import StudentModel from '../student/student.model';
import TeacherModel from '../teacher/teacher.model';


export const createUserIntoDB = async (payload: IUser & { [key: string]: any }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Create base user
    const { role, ...userData } = payload;
    const newUser = await UserModel.create([{ ...userData, role }], { session });
    const createdUser = newUser[0];

    // Step 2: Create role-based model (student/teacher)
    let roleData;

    if (role === "student") {
      roleData = await StudentModel.create(
        [{ user: createdUser._id, ...payload.studentData }],
        { session }
      );
    } else if (role === "teacher") {
      roleData = await TeacherModel.create(
        [{ user: createdUser._id, ...payload.teacherData }],
        { session }
      );
    } else {
      throw new Error("Invalid role specified.");
    }

    await session.commitTransaction();
    session.endSession();
    return {
      success: true,
      message: `${role} created successfully`,
      data: {
        user: createdUser,
        [role]: roleData[0],
      },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Transaction failed: " + error);
  }
};


export const getProfile = async (_id: string) => {


  if (!_id) throw new Error('User ID is required to fetch profile.');

  const user = await UserModel.findById(_id).select('-password -__v').lean();
  console.log(user)

  if (!user) throw new Error('User not found.');

  const profile: any = { ...user };

  if (user.role === USER_ROLE.student) {
    const studentData = await StudentModel.findOne({user: user._id })
      .select('-__v -createdAt -updatedAt')
      // .populate([
      //   { path: 'enrolledCourses', select: 'title description' },
      //   { path: 'followedTeachers', select: 'user' },
      //   { path: 'progress.course', select: 'title' },
      //   { path: 'progress.lesson', select: 'title' },
      //   { path: 'progress.completedTopics', select: 'title' }
      // ])
      .lean();

    if (studentData) {
      profile.studentInfo = studentData;
    }
  }

  if (user.role === USER_ROLE.teacher) {
    const teacherData = await TeacherModel.findOne({user: user._id })
      .select('-__v -createdAt -updatedAt')
      // .populate([
      //   { path: 'courses', select: 'title description' },
      //   { path: 'followers', select: 'user' },
      //   { path: 'analytics.course', select: 'title' }
      // ])
      .lean();

    if (teacherData) {
      profile.teacherInfo = teacherData;
    }
  }

  return profile;
};






export const userService = {
  createUserIntoDB,
  getProfile
}
