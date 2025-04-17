import express from 'express';
import { auth } from '../../middlewares/auth';
import { StudentController } from './student.controller';

const studentRouter = express.Router();

studentRouter.post('/enrolled-courses', auth.authUser('student'), StudentController.enrolledCoursesStudent);



export default studentRouter;