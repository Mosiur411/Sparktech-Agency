import mongoose, { startSession } from "mongoose";
import { UserModel } from "../user/user.model";
import { IStudentUser } from "./student.interface";
import StudentUserModel from "./student.model";
import { IUser } from "../user/user.interface";


const getAllStudents = async () => {
    const result = await StudentUserModel.find().populate('user');
    return result;
    
}

const getStudentById = async (_id: string) => {
    const result = await StudentUserModel.findOne({user: _id});
    return result;
}


const updateStudentFromDb = async (
  _id: string,
  payload: Partial<IStudentUser>
) => {
  const session = await startSession();
  session.startTransaction();
console.log(payload)
  try {
    const {
      preferences,
      academic_info,
      emergency_contact,
      user,
      ...remainingStudentData
    } = payload;
    let updateData: Record<string, any> = { ...remainingStudentData };

    // Handle preferences as a complete object
    if (preferences) {
      updateData.preferences = preferences;
    }

    // Handle academic_info as a complete object
    if (academic_info) {
      updateData.academic_info = academic_info;
    }

    // Handle emergency_contact as a complete object
    if (emergency_contact) {
      updateData.emergency_contact = emergency_contact;
    }

    // Update student document
   const updatedStudent = await StudentUserModel.findOneAndUpdate(
     { user: _id }, // Find student by user ID instead of direct _id
     updateData,
     {
       new: true,
       runValidators: true,
       session,
     }
   ); if (!updatedStudent) {
      throw new Error("Student not found");
    }

    // User data update, if any user fields are present
    const userFields = [
      "name",
      "gmail",
      "password",
      "contact",
      "address",
      "role",
      "profile_picture",
      "registration_date",
      "last_login",
      "status",
    ];

    const userUpdateData: Partial<IUser> = {};
    for (const field of userFields) {
      const value = payload[field as keyof IUser];
      if (value !== undefined) {
        userUpdateData[field as keyof IUser] = value as any;
      }
    }

    if (Object.keys(userUpdateData).length > 0) {
      const userId = updatedStudent.user;
      await UserModel.findByIdAndUpdate(userId, userUpdateData, {
        new: true,
        runValidators: true,
        session,
      });
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return updatedStudent;
  } catch (error) {
    // Abort the transaction if anything fails
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction failed:", error); // Log the actual error
    //throw new Error(`Transaction failed: ${error.message}`);
  }
};
  
  const deleteStudentById = async (_id: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        // Student ke find kore check kora
        const student = await StudentUserModel.findOne({ _id }).session(session);
        if (!student) {
            throw new Error("Student not found");
        }

        // Student er associated user er _id niye delete korbo
        const userId = student.user?._id;
        
        // StudentUserModel theke delete
        await StudentUserModel.findOneAndDelete({ _id }).session(session);

        // UserModel theke user delete
        if (userId) {
            await UserModel.findOneAndDelete({ _id: userId }).session(session);
        }

        // Transaction commit
        await session.commitTransaction();
        session.endSession();

        return { message: "Student and associated user deleted successfully"   };
    } catch (error) {
        // Rollback transaction if error occurs
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};





export const studentsService = {
    getAllStudents,
    getStudentById,
updateStudentFromDb,
    deleteStudentById,
 
}