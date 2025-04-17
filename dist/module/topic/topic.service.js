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
exports.topicService = void 0;
const mongoose_1 = require("mongoose");
const topic_model_1 = require("./topic.model");
const createTopicIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield topic_model_1.TopicModel.create(payload);
    return result;
});
const getAllTopicIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
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
    const topics = yield topic_model_1.TopicModel.find(finalFilter)
        .skip(skip)
        .limit(Number(limit))
        .lean();
    const total = yield topic_model_1.TopicModel.countDocuments(finalFilter);
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total
        },
        data: topics
    };
});
const getSingleTopicIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, userId } = payload;
    const topics = yield topic_model_1.TopicModel.find({ _id: _id, teacher: userId })
        .lean();
    return topics;
});
const deleteTopicIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, userId } = payload;
    const topics = yield topic_model_1.TopicModel.deleteOne({ _id: _id, teacher: userId })
        .lean();
    return topics;
});
const updateTopicIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId, data, paramsId: topicId } = payload;
    if (!topicId || !mongoose_1.Types.ObjectId.isValid(topicId)) {
        throw new Error("A valid Topic ID is required for update.");
    }
    // Optionally check topic exists and belongs to user
    const topic = yield topic_model_1.TopicModel.findById(topicId);
    if (!topic)
        throw new Error("Topic not found.");
    if (topic.teacher.toString() !== userId.toString()) {
        throw new Error("Unauthorized: Cannot update this topic.");
    }
    // Merge teacher and update fields
    const updatedTopic = yield topic_model_1.TopicModel.findByIdAndUpdate(topicId, {
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
exports.topicService = {
    createTopicIntoDb,
    getAllTopicIntoDb,
    updateTopicIntoDb,
    getSingleTopicIntoDb,
    deleteTopicIntoDb
};
