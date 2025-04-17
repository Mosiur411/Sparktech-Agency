import { Types } from "mongoose";
import { ILesson } from "./lesson.interface";
import { LessonModel } from "./lesson.model";
interface IUpdateLessonPayload {
    _id: string;
    paramsId: string,
    data: {
        title?: string;
        description?: string;
        topics?:[];
    };
}


const createLessonIntoDb = async(payload:ILesson) => {
    const result = await LessonModel.create(payload);
    return result;
}

const getAllLessonIntoDb = async (payload: any) => {
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

    const topics = await LessonModel.find(finalFilter)
        .skip(skip)
        .limit(Number(limit))
        .lean();

    const total = await LessonModel.countDocuments(finalFilter);

    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total
        },
        data: topics
    };
};
const getSingleLessonIntoDb = async (payload: any) => {
    const { _id, userId } = payload;
   
    const topics = await LessonModel.find({_id:_id, teacher:userId})
        .lean();

    return topics; 
 
};
const deleteLessonIntoDb = async (payload: any) => {
    const { _id, userId } = payload;
   
    const topics = await LessonModel.deleteOne({_id:_id, teacher:userId})
        .lean();

    return topics; 
 
};


const updateLessonIntoDb = async (payload: IUpdateLessonPayload) => {
    const { _id: userId, data, paramsId: topicId } = payload;

    if (!topicId || !Types.ObjectId.isValid(topicId)) {
        throw new Error("A valid Topic ID is required for update.");
    }

    // Optionally check topic exists and belongs to user
    const topic = await LessonModel.findById(topicId);
    if (!topic) throw new Error("Topic not found.");
    if (topic.teacher.toString() !== userId.toString()) {
        throw new Error("Unauthorized: Cannot update this topic.");
    }

    // Merge teacher and update fields
    const updatedTopic = await LessonModel.findByIdAndUpdate(
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



export const lessonService = {
    createLessonIntoDb,
    getAllLessonIntoDb,
    getSingleLessonIntoDb,
    deleteLessonIntoDb,
    updateLessonIntoDb,
}