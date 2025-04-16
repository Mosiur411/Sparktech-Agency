import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';


const courseRouter = express.Router();
courseRouter.post('/create-course', validateRequest(courseValidation.createCourseSchema), courseController.createCourse);
courseRouter.get('/', courseController.getAllCourses);
courseRouter.get('/:id', courseController.getSingleCourse);
courseRouter.patch('/:id', courseController.updateCourse);
courseRouter.delete('/:id', courseController.deleteCourse);
export default courseRouter;