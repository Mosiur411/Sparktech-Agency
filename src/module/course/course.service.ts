import { ICourse } from "./course.interface";
import { CourseModel } from "./course.model";

const createCourseIntoDb = async(payload:ICourse) => {
    const result = await CourseModel.create(payload);
    return result;
}

const getAllCoursesFromDb = async() => {
    const result = await CourseModel.find();
    return result;
}

const getCourseById = async (_id: string) => {
    const result = await CourseModel.findOne({_id});
    return result;
}

const updateCourseInDb = async(_id: string, payload: Partial<ICourse>) => {
    const result = await CourseModel.findOneAndUpdate({_id}, payload, {new: true});
    return result;
}

const deleteCourseFromDb = async (_id: string) => {
    const result = await CourseModel.findOneAndDelete({_id});
    return result;
}


export const courseService = {
    createCourseIntoDb,
    getAllCoursesFromDb,
    getCourseById,
    updateCourseInDb,
    deleteCourseFromDb,
 
}