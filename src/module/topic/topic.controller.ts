import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { topicService } from "./topic.service";

const createTopic = catchAsync(async (req, res) => {
    const data = req.body
    const user = req.user
    const result = await topicService.createTopicIntoDb({ ...data, teacher: user?._id });
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Topic Created successfully',
        data: result,
    });
});


const getTopic = catchAsync(async (req, res) => {
    const data = req.user;
    const query = req.query;
    const result = await topicService.getAllTopicIntoDb({ query: query, _id: data?._id });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Topic get successfully',
        data: result,
    })

});
const getsingleTopic = catchAsync(async (req, res) => {
    const user = req.user;
    const paramsid = req.params.id;
    const result = await topicService.getSingleTopicIntoDb({ _id: paramsid, userId: user?._id });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Topic Single successfully',
        data: result,
    })

});
const deleteTopic = catchAsync(async (req, res) => {
    const user = req.user;
    const paramsid = req.params.id;
    const result = await topicService.deleteTopicIntoDb({ _id: paramsid, userId: user?._id });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Topic Delete successfully',
        data: result,
    })

});


const updateTopic= catchAsync(async (req, res) => {
    const user = req.user;
    const data = req.body;
    const paramsid = req.params.id;
    const result = await topicService.updateTopicIntoDb({ data: data, _id: user?._id, paramsId:paramsid });
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Topic Update successfully',
        data: result,
    })

});

export const topicController = {
    createTopic,
    getTopic,
    updateTopic,
    getsingleTopic,
    deleteTopic
}