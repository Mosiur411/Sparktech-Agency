import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { lessonService } from "./lesson.service";

const createLesson = catchAsync(async(req, res) => {
    const data = req.body
    const user = req.user
    const result = await lessonService.createLessonIntoDb({...data,teacher:user?._id});
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Lesson Created successfully',
        data: result,
    });
});

const getLesson = catchAsync(async (req, res) => {
    const data = req.user;
    const query = req.query;
    const result = await lessonService.getAllLessonIntoDb({ query: query, _id: data?._id });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Lesson get successfully',
        data: result,
    })

});
const getsingleLesson = catchAsync(async (req, res) => {
    const user = req.user;
    const paramsid = req.params.id;
    const result = await lessonService.getSingleLessonIntoDb({ _id: paramsid, userId: user?._id });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Lesson Single successfully',
        data: result,
    })

});
const deleteLesson = catchAsync(async (req, res) => {
    const user = req.user;
    const paramsid = req.params.id;
    const result = await lessonService.deleteLessonIntoDb({ _id: paramsid, userId: user?._id });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Lesson Delete successfully',
        data: result,
    })

});


const updateLesson = catchAsync(async (req, res) => {
    const user = req.user;
    const data = req.body;
    const paramsid = req.params.id;
    const result = await lessonService.updateLessonIntoDb({ data: data, _id: user?._id, paramsId:paramsid });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Lesson Update successfully',
        data: result,
    })

});

export const lessonController = {
    createLesson,
    getLesson,
    updateLesson,
    getsingleLesson,
    deleteLesson,
    
}