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
exports.lessonController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const lesson_service_1 = require("./lesson.service");
const createLesson = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = req.user;
    const result = yield lesson_service_1.lessonService.createLessonIntoDb(Object.assign(Object.assign({}, data), { teacher: user === null || user === void 0 ? void 0 : user._id }));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: 'Lesson Created successfully',
        data: result,
    });
}));
const getLesson = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.user;
    const query = req.query;
    const result = yield lesson_service_1.lessonService.getAllLessonIntoDb({ query: query, _id: data === null || data === void 0 ? void 0 : data._id });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Lesson get successfully',
        data: result,
    });
}));
const getsingleLesson = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const paramsid = req.params.id;
    const result = yield lesson_service_1.lessonService.getSingleLessonIntoDb({ _id: paramsid, userId: user === null || user === void 0 ? void 0 : user._id });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Lesson Single successfully',
        data: result,
    });
}));
const deleteLesson = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const paramsid = req.params.id;
    const result = yield lesson_service_1.lessonService.deleteLessonIntoDb({ _id: paramsid, userId: user === null || user === void 0 ? void 0 : user._id });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Lesson Delete successfully',
        data: result,
    });
}));
const updateLesson = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const data = req.body;
    const paramsid = req.params.id;
    const result = yield lesson_service_1.lessonService.updateLessonIntoDb({ data: data, _id: user === null || user === void 0 ? void 0 : user._id, paramsId: paramsid });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Lesson Update successfully',
        data: result,
    });
}));
exports.lessonController = {
    createLesson,
    getLesson,
    updateLesson,
    getsingleLesson,
    deleteLesson,
};
