import mongoose from 'mongoose';
import { IStudentUser } from '../student/student.interface'
import { UserModel } from './user.model';
import { IUser } from './user.interface';
import StudentUserModel from '../student/student.model';
import { IFacultyUser } from '../faculty/faculty.interface';
import FacultyUserModel from '../faculty/faculty.model';
import CanteenstaffUserModel from '../canteenstaff/canteenstaff.model';


const createStudentsIntoDB = async (payload: IStudentUser) => {
  const userData: Partial<IUser> = {};
  userData.name = payload.name;
  userData.status = payload.status;
  userData.role = 'student';
  userData.address = payload.address;
  userData.contact = payload.contact;
  userData.password = payload.password
  userData.gmail = payload.gmail;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newUser = await UserModel.create([userData], { session });
    payload.user = newUser[0]._id;
    const student = await StudentUserModel.create([payload], { session });
    await session.commitTransaction();
    session.endSession();
    return { student: student[0] };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Transaction failed: " + error);
  }
};
const createAdminIntoDB = async (payload: IStudentUser) => {
  const userData: Partial<IUser> = {};
  userData.name = payload.name;
  userData.status = payload.status;
  userData.role = 'admin';
  userData.address = payload.address;
  userData.contact = payload.contact;
  userData.password = payload.password
  userData.gmail = payload.gmail;
  const newUser = await UserModel.create(userData);
  return newUser;

};

const createFacultysIntoDB = async (payload: IFacultyUser) => {
  const userData: Partial<IUser> = {};
  userData.name = payload.name;
  userData.status = payload.status;
  userData.role = 'faculty';
  userData.address = payload.address;
  userData.contact = payload.contact;
  userData.password = payload.password
  userData.gmail = payload.gmail;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newUser = await UserModel.create([userData], { session });
    payload.user = newUser[0]._id;
    const faculty = await FacultyUserModel.create([payload], { session });
    await session.commitTransaction();
    session.endSession();
    return { faculty: faculty[0] };
  } catch (error) {
    console.log('error',error)
    await session.abortTransaction();
    session.endSession();
    new Error("Transaction failed: " + error);
  }
};

const createGuestsIntoDB = async (payload: IStudentUser) => {
  const userData: Partial<IUser> = {};
  userData.name = payload.name;
  userData.status = payload.status;
  userData.role = 'student';
  userData.address = payload.address;
  userData.contact = payload.contact;
  userData.password = payload.password
  userData.gmail = payload.gmail;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newUser = await UserModel.create([userData], { session });
    payload.user = newUser[0]._id;
    const student = await StudentUserModel.create([payload], { session });
    await session.commitTransaction();
    session.endSession();
    return { student: student[0] };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Transaction failed: " + error);
  }
};

const createCanteenStaffsIntoDB = async (payload: IStudentUser) => {
  const userData: Partial<IUser> = {};
  userData.name = payload.name;
  userData.status = payload.status;
  userData.role = 'canteen_staff';
  userData.address = payload.address;
  userData.contact = payload.contact;
  userData.password = payload.password
  userData.gmail = payload.gmail;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newUser = await UserModel.create([userData], { session });
    payload.user = newUser[0]._id;
    const canteenstaff = await CanteenstaffUserModel.create([payload], { session });
    await session.commitTransaction();
    session.endSession();
    return { canteenstaff: canteenstaff[0] };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Transaction failed: " + error);
  }
};


const getUSers = async () => {
  const users = await UserModel.find();
  return users;
}


const deleteUser = async () => {
  const result = await UserModel.deleteMany();
  return result;
}

const getPofile = async (gmail: string) => {
  if (!gmail) throw new Error('mobile is required to fetch profile.');

  const result = await UserModel.findOne({ gmail }); 
  if (!result) throw new Error('User not found.');

  return result;
};

export const userService = {
  createStudentsIntoDB,
  getUSers,
  deleteUser,
  getPofile,
  createFacultysIntoDB,
  createGuestsIntoDB,
  createCanteenStaffsIntoDB,
  createAdminIntoDB
}
