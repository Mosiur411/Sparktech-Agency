import { Types } from "mongoose";
import { ITopic } from "./topic.interface";
import { TopicModel } from "./topic.model";

interface IUpdateTopicPayload {
    _id: string;
    paramsId: string,
    data: {
        title?: string;
        content?: string;
        quiz?: {
            question: string;
            options: string[];
            correctAnswer: string;
        };
    };
}


const createTopicIntoDb = async (payload: ITopic) => {

    const result = await TopicModel.create(payload);
    return result;
}


const getAllTopicIntoDb = async (payload: any) => {
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

    const finalFilter = {
        ...searchFilter,
        ...teacherFilter
    };

    const topics = await TopicModel.find(finalFilter)
        .skip(skip)
        .limit(Number(limit))
        .lean();

    const total = await TopicModel.countDocuments(finalFilter);

    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total
        },
        data: topics
    };
};
const getSingleTopicIntoDb = async (payload: any) => {
    const { _id, userId } = payload;
   
    const topics = await TopicModel.find({_id:_id, teacher:userId})
        .lean();

    return topics; 
 
};
const deleteTopicIntoDb = async (payload: any) => {
    const { _id, userId } = payload;
   
    const topics = await TopicModel.deleteOne({_id:_id, teacher:userId})
        .lean();

    return topics; 
 
};


const updateTopicIntoDb = async (payload: IUpdateTopicPayload) => {
    const { _id: userId, data, paramsId: topicId } = payload;

    if (!topicId || !Types.ObjectId.isValid(topicId)) {
        throw new Error("A valid Topic ID is required for update.");
    }

    // Optionally check topic exists and belongs to user
    const topic = await TopicModel.findById(topicId);
    if (!topic) throw new Error("Topic not found.");
    if (topic.teacher.toString() !== userId.toString()) {
        throw new Error("Unauthorized: Cannot update this topic.");
    }

    // Merge teacher and update fields
    const updatedTopic = await TopicModel.findByIdAndUpdate(
        topicId,
        {
            $set: {
                ...data,
                teacher: userId,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    ).lean();

    if (!updatedTopic) {
        throw new Error("Topic update failed.");
    }

    return updatedTopic;
};



export const topicService = {
    createTopicIntoDb,
    getAllTopicIntoDb,
    updateTopicIntoDb,
    getSingleTopicIntoDb,
    deleteTopicIntoDb
}