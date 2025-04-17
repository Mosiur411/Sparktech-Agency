import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { lessonValidation } from './lesson.validation';
import { lessonController } from './lesson.controller';


const lessonRouter = express.Router();
lessonRouter.post('/', auth.authUser('teacher'), validateRequest(lessonValidation.createLessonSchema), lessonController.createLesson);
lessonRouter.get('/', auth.authUser('teacher'),  lessonController.getLesson);
lessonRouter.get('/:id', auth.authUser('teacher'),  lessonController.getsingleLesson);
lessonRouter.patch('/:id', auth.authUser('teacher'),  lessonController.updateLesson);
lessonRouter.delete('/:id', auth.authUser('teacher'),  lessonController.deleteLesson);

export default lessonRouter;