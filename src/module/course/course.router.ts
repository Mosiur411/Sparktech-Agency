import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';
import { auth } from '../../middlewares/auth';


const courseRouter = express.Router();
courseRouter.post('/', auth.authUser('teacher'), validateRequest(courseValidation.createCourseSchema), courseController.createCourse);

courseRouter.get('/', auth.authUser('teacher'),  courseController.getCourse);
courseRouter.get('/:id', auth.authUser('teacher'),  courseController.getsingleCourse);
courseRouter.patch('/:id', auth.authUser('teacher'),  courseController.updateCourse);
courseRouter.delete('/:id', auth.authUser('teacher'),  courseController.deleteCourse);



export default courseRouter;