"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const topic_service_1 = require("./topic.service");
const createTopic = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = req.user;
    const result = yield topic_service_1.topicService.createTopicIntoDb(Object.assign(Object.assign({}, data), { teacher: user === null || user === void 0 ? void 0 : user._id }));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: 'Topic Created successfully',
        data: result,
    });
}));
const getTopic = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.user;
    const query = req.query;
    const result = yield topic_service_1.topicService.getAllTopicIntoDb({ query: query, _id: data === null || data === void 0 ? void 0 : data._id });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Topic get successfully',
        data: result,
    });
}));
const getsingleTopic = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const paramsid = req.params.id;
    const result = yield topic_service_1.topicService.getSingleTopicIntoDb({ _id: paramsid, userId: user === null || user === void 0 ? void 0 : user._id });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Topic Single successfully',
        data: result,
    });
}));
const deleteTopic = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const paramsid = req.params.id;
    const result = yield topic_service_1.topicService.deleteTopicIntoDb({ _id: paramsid, userId: user === null || user === void 0 ? void 0 : user._id });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Topic Delete successfully',
        data: result,
    });
}));
const updateTopic = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const data = req.body;
    const paramsid = req.params.id;
    const result = yield topic_service_1.topicService.updateTopicIntoDb({ data: data, _id: user === null || user === void 0 ? void 0 : user._id, paramsId: paramsid });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Topic Update successfully',
        data: result,
    });
}));
exports.topicController = {
    createTopic,
    getTopic,
    updateTopic,
    getsingleTopic,
    deleteTopic
};
