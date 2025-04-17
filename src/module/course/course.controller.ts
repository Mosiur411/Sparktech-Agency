import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseService } from "./course.service";

const createCourse = catchAsync(async(req, res) => {
    const data =req.body
    const user =req.user
    const result = await courseService.createCourseIntoDb({...data,teacher:user?._id});
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Course Created successfully',
        data: result,
    });
});


const getCourse = catchAsync(async (req, res) => {
    const data = req.user;
    const query = req.query;
    const result = await courseService.getAllCourseIntoDb({ query: query, _id: data?._id });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Course get successfully',
        data: result,
    })

});
const getsingleCourse = catchAsync(async (req, res) => {
    const user = req.user;
    const paramsid = req.params.id;
    const result = await courseService.getSingleCourseIntoDb({ _id: paramsid, userId: user?._id });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Course Single successfully',
        data: result,
    })

});
const deleteCourse = catchAsync(async (req, res) => {
    const user = req.user;
    const paramsid = req.params.id;
    const result = await courseService.deleteCourseIntoDb({ _id: paramsid, userId: user?._id });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Course Delete successfully',
        data: result,
    })

});


const updateCourse = catchAsync(async (req, res) => {
    const user = req.user;
    const data = req.body;
    const paramsid = req.params.id;
    const result = await courseService.updateCourseIntoDb({ data: data, _id: user?._id, paramsId:paramsid });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Course Update successfully',
        data: result,
    })

});
const feedbackCourse = catchAsync(async (req, res) => {
    const user = req.user;
    const data = req.body;
    const paramsid = req.params.id;
    const result = await courseService.feedbackCourseIntoDb({ data: data, _id: user?._id, courseId:paramsid });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Course Update successfully',
        data: result,
    })

});
const likeCourse = catchAsync(async (req, res) => {
    const user = req.user;
    const paramsid = req.params.id;
    const result = await courseService.likeCourseIntoDb({_id: user?._id, courseId:paramsid });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Course Update successfully',
        data: result,
    })

});


export const courseController = {
    createCourse,
    getCourse,
    getsingleCourse,
    updateCourse,
    deleteCourse,
    feedbackCourse,
    likeCourse,
 
}