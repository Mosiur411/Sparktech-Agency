import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { studentsService } from "./student.service";

const getAllStudents = catchAsync(async (req, res) => {
    const students = await studentsService.getAllStudents();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Students Get successfully',
        data: students,
      }
  
      )
});

const getSingleStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const student = await studentsService.getStudentById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Single Student Get successfully',
        data: student,
    });
})

const updatedStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedStudent = await studentsService.updateStudentFromDb(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Student Updated successfully',
        data: updatedStudent,
    });
})

const deleteStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
   const result =  await studentsService.deleteStudentById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Student Deleted successfully',
        data:result
    });
})

export const studentsController = {
    getAllStudents,
    getSingleStudent,
    updatedStudent,
    deleteStudent,
}