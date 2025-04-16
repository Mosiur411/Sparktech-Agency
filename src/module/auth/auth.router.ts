import { Router } from "express";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { globalErrorHandler } from "../../middlewares/globalErrorHandler";

const authRouter = Router();

authRouter.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.login);

authRouter.use(globalErrorHandler);

export default authRouter;