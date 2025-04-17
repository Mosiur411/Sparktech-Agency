import express from 'express';
import { auth } from '../../middlewares/auth';
import { StudentController } from './student.controller';

const studentRouter = express.Router();

studentRouter.post('/enrolled-courses', auth.authUser('student'), StudentController.enrolledCoursesStudent);
studentRouter.get('/courses', auth.authUser('student'), StudentController.getenrolledCoursesStudentIntoDb);



export default studentRouter;