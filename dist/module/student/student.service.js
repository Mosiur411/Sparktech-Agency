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
exports.studentService = void 0;
const course_model_1 = require("../course/course.model");
const student_model_1 = __importDefault(require("./student.model"));
const enrolledCoursesStudentIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { studentId, courseId } = payload;
    const course = yield course_model_1.CourseModel.findById(courseId);
    if (!course)
        throw new Error("Course not found.");
    // Check if student already enrolled in course
    const isAlreadyEnrolledInCourse = (_a = course.enrolledStudents) === null || _a === void 0 ? void 0 : _a.includes(studentId);
    if (isAlreadyEnrolledInCourse)
        throw new Error("Already enrolled in this course.");
    // Add student to course
    course.enrolledStudents.push(studentId);
    yield course.save();
    // Now update student document
    const student = yield student_model_1.default.findOne({ user: studentId });
    if (!student)
        throw new Error("Student not found.");
    const isAlreadyInStudent = student.enrolledCourses.includes(courseId);
    if (!isAlreadyInStudent) {
        student.enrolledCourses.push(courseId);
        yield student.save();
    }
    return student;
});
exports.studentService = {
    enrolledCoursesStudentIntoDb
};
