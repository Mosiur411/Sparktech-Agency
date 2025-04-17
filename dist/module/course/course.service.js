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
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseService = void 0;
const mongoose_1 = require("mongoose");
const course_model_1 = require("./course.model");
const createCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseModel.create(payload);
    return result;
});
const getAllCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, _id } = payload;
    const { page = 1, limit = 10, searchTerm } = query || {};
    const skip = (Number(page) - 1) * Number(limit);
    const searchFilter = searchTerm
        ? {
            $or: [
                { title: { $regex: searchTerm, $options: "i" } },
                { content: { $regex: searchTerm, $options: "i" } }
            ]
        }
        : {};
    const teacherFilter = _id ? { teacher: _id } : {};
    const finalFilter = Object.assign(Object.assign({}, searchFilter), teacherFilter);
    const course = yield course_model_1.CourseModel.find(finalFilter)
        .skip(skip)
        .limit(Number(limit))
        .lean();
    const total = yield course_model_1.CourseModel.countDocuments(finalFilter);
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total
        },
        data: course
    };
});
const getSingleCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, userId } = payload;
    const course = yield course_model_1.CourseModel.find({ _id: _id, teacher: userId })
        .lean();
    return course;
});
const deleteCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, userId } = payload;
    const course = yield course_model_1.CourseModel.deleteOne({ _id: _id, teacher: userId })
        .lean();
    return course;
});
const updateCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId, data, paramsId: topicId } = payload;
    if (!topicId || !mongoose_1.Types.ObjectId.isValid(topicId)) {
        throw new Error("A valid Topic ID is required for update.");
    }
    // Optionally check topic exists and belongs to user
    const topic = yield course_model_1.CourseModel.findById(topicId);
    if (!topic)
        throw new Error("Topic not found.");
    if (topic.teacher.toString() !== userId.toString()) {
        throw new Error("Unauthorized: Cannot update this topic.");
    }
    // Merge teacher and update fields
    const updatedTopic = yield course_model_1.CourseModel.findByIdAndUpdate(topicId, {
        $set: Object.assign(Object.assign({}, data), { teacher: userId }),
    }, {
        new: true,
        runValidators: true,
    }).lean();
    if (!updatedTopic) {
        throw new Error("Topic update failed.");
    }
    return updatedTopic;
});
const feedbackCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId, data, courseId } = payload;
    if (!courseId || !mongoose_1.Types.ObjectId.isValid(courseId)) {
        throw new Error("A valid course ID is required for update.");
    }
    // Optionally check course exists and belongs to user
    const course = yield course_model_1.CourseModel.findById(courseId);
    if (!course)
        throw new Error("course not found.");
    // Merge teacher and update fields
    const updatedcourse = yield course_model_1.CourseModel.findByIdAndUpdate(courseId, {
        $push: {
            feedbacks: Object.assign({ student: userId }, data)
        }
    });
    if (!updatedcourse) {
        throw new Error("course update failed.");
    }
    return updatedcourse;
});
const likeCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId, courseId } = payload;
    if (!courseId || !mongoose_1.Types.ObjectId.isValid(courseId)) {
        throw new Error("A valid course ID is required for update.");
    }
    const course = yield course_model_1.CourseModel.findById(courseId);
    if (!course)
        throw new Error("Course not found.");
    // Check if the user already liked the course
    const alreadyLiked = course.likes.some((likeId) => likeId.toString() === userId.toString());
    if (alreadyLiked) {
        throw new Error("You have already liked this course.");
    }
    // Push like if not already liked
    const updatedCourse = yield course_model_1.CourseModel.findByIdAndUpdate(courseId, { $push: { likes: userId } }, { new: true });
    if (!updatedCourse) {
        throw new Error("Course update failed.");
    }
    return updatedCourse;
});
exports.courseService = {
    createCourseIntoDb,
    getAllCourseIntoDb,
    getSingleCourseIntoDb,
    deleteCourseIntoDb,
    updateCourseIntoDb,
    feedbackCourseIntoDb,
    likeCourseIntoDb
};
