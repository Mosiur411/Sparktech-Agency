import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { userController } from './user.controller'
import { auth } from '../../middlewares/auth'
import { userValidation } from './user.validation'

const userRouter = Router()

userRouter.post('/create-account', validateRequest(userValidation.createUserValidationSchema), userController.createUser);

userRouter.get('/profile', auth.authUser('student','teacher'), userController.getProfile);


export default userRouter;
