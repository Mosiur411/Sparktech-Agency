import { Types } from "mongoose";
import { ICourse } from "./course.interface";
import { CourseModel } from "./course.model";

interface IUpdateCoursePayload {
    _id: string;
    paramsId: string,
    data: {
        title?: string;
        description?: string;
        lessons?: Types.ObjectId[];
        likes?: { student: Types.ObjectId; message: string }[];
        feedbacks?: { student: Types.ObjectId; message: string }[];
    };
}



const createCourseIntoDb = async (payload: ICourse) => {
    const result = await CourseModel.create(payload);
    return result;
}


const getAllCourseIntoDb = async (payload: any) => {
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

    const course = await CourseModel.find(finalFilter)
        .skip(skip)
        .limit(Number(limit))
        .lean();

    const total = await CourseModel.countDocuments(finalFilter);

    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total
        },
        data: course
    };
};
const getSingleCourseIntoDb = async (payload: any) => {
    const { _id, userId } = payload;

    const course = await CourseModel.find({ _id: _id, teacher: userId })
        .lean();

    return course;

};
const deleteCourseIntoDb = async (payload: any) => {
    const { _id, userId } = payload;

    const course = await CourseModel.deleteOne({ _id: _id, teacher: userId })
        .lean();

    return course;

};

const updateCourseIntoDb = async (payload: IUpdateCoursePayload) => {
    const { _id: userId, data, paramsId: topicId } = payload;

    if (!topicId || !Types.ObjectId.isValid(topicId)) {
        throw new Error("A valid Topic ID is required for update.");
    }

    // Optionally check topic exists and belongs to user
    const topic = await CourseModel.findById(topicId);
    if (!topic) throw new Error("Topic not found.");
    if (topic.teacher.toString() !== userId.toString()) {
        throw new Error("Unauthorized: Cannot update this topic.");
    }

    // Merge teacher and update fields
    const updatedTopic = await CourseModel.findByIdAndUpdate(
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

const feedbackCourseIntoDb = async (payload: any) => {
    const { _id: userId,data,courseId } = payload;

    if (!courseId || !Types.ObjectId.isValid(courseId)) {
        throw new Error("A valid course ID is required for update.");
    }

    // Optionally check course exists and belongs to user
    const course = await CourseModel.findById(courseId);
    if (!course) throw new Error("course not found.");


    // Merge teacher and update fields
    const updatedcourse = await CourseModel.findByIdAndUpdate(courseId, {
        $push: {
            feedbacks: {
                student: userId,
                ...data
            }
        }

    });

    if (!updatedcourse) {
        throw new Error("course update failed.");
    }

    return updatedcourse;
};



const likeCourseIntoDb = async (payload: any) => {
    const { _id: userId, courseId } = payload;
  
    if (!courseId || !Types.ObjectId.isValid(courseId)) {
      throw new Error("A valid course ID is required for update.");
    }
  
    const course = await CourseModel.findById(courseId);
    if (!course) throw new Error("Course not found.");
  
    // Check if the user already liked the course
    const alreadyLiked = course.likes.some(
      (likeId: any) => likeId.toString() === userId.toString()
    );
  
    if (alreadyLiked) {
      throw new Error("You have already liked this course.");
    }
  
    // Push like if not already liked
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      { $push: { likes: userId } },
      { new: true }
    );
  
    if (!updatedCourse) {
      throw new Error("Course update failed.");
    }
  
    return updatedCourse;
  };



export const courseService = {
    createCourseIntoDb,
    getAllCourseIntoDb,
    getSingleCourseIntoDb,
    deleteCourseIntoDb,
    updateCourseIntoDb,
    feedbackCourseIntoDb,
    likeCourseIntoDb
}