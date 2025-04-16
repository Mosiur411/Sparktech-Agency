import express from 'express';
import { studentsController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentsValidation } from './student.validation';


const studentRoute = express.Router();
studentRoute.get('/', studentsController.getAllStudents );
studentRoute.get('/:id', studentsController.getSingleStudent);
studentRoute.patch('/:id', validateRequest(studentsValidation.updateStudentValidationSchema) ,studentsController.updatedStudent);
studentRoute.delete("/:id", studentsController.deleteStudent);

export default studentRoute;