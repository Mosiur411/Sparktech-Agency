import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { studentsValidation } from '../student/student.validation'
import { userController } from './user.controller'
import { facultysValidation } from '../faculty/faculty.validation'
import { canteenstaffValidation } from '../canteenstaff/canteenstaff.validation'
import { auth } from '../../middlewares/auth'

const userRouter = Router()

userRouter.post('/create-admin', userController.createAdmin);
userRouter.post('/create-student', validateRequest(studentsValidation.createStudentValidationSchema), userController.createStudeent);
userRouter.get('/profile', auth.authUser('student', 'admin', 'faculty', 'guest', 'canteen_staff'), userController.getProfile);
userRouter.post('/create-faculty', validateRequest(facultysValidation.createFacultyValidationSchema), userController.createFaculty);
userRouter.post('/create-canteen-staff', validateRequest(canteenstaffValidation.createcanteenstaffValidationSchema), userController.createCanteenStaff);
userRouter.get('/', userController.getAllUsers);
userRouter.delete('/', userController.deleteUsers)



export default userRouter;
