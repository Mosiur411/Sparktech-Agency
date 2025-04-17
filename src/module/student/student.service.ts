import { CourseModel } from "../course/course.model";
import StudentModel from "./student.model";

const enrolledCoursesStudentIntoDb = async (payload:any) => {
    const { studentId, courseId } = payload;

    const course = await CourseModel.findById(courseId);
    if (!course) throw new Error("Course not found.");
    // Check if student already enrolled in course
    const isAlreadyEnrolledInCourse = course.enrolledStudents?.includes(studentId);
    if (isAlreadyEnrolledInCourse) throw new Error("Already enrolled in this course.");

    // Add student to course
    course.enrolledStudents.push(studentId);
    await course.save();
    // Now update student document
    const student = await StudentModel.findOne({ user: studentId });
    if (!student) throw new Error("Student not found.");
  
    const isAlreadyInStudent = student.enrolledCourses.includes(courseId);
    if (!isAlreadyInStudent) {
      student.enrolledCourses.push(courseId);
      await student.save();
    }
    return student;

}



export const studentService = {
    enrolledCoursesStudentIntoDb
}