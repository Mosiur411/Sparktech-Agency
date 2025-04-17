import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { studentService } from "./student.service";

const enrolledCoursesStudent  = catchAsync(async(req, res) => {
    const data =req.body
    const user =req.user

    const result = await studentService.enrolledCoursesStudentIntoDb({courseId:data.courseId ,studentId:user?._id});
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Enrolled Course Created successfully',
        data: result,
    });
});
const getenrolledCoursesStudentIntoDb  = catchAsync(async(req, res) => {
    const user =req.user
    const result = await studentService.getenrolledCoursesStudentIntoDb({studentId:user?._id});
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Enrolled Course Created successfully',
        data: result,
    });
});




export const StudentController = {
    enrolledCoursesStudent,
    getenrolledCoursesStudentIntoDb
   
}