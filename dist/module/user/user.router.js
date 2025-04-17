"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middlewares/auth");
const user_validation_1 = require("./user.validation");
const userRouter = (0, express_1.Router)();
userRouter.post('/create-account', (0, validateRequest_1.default)(user_validation_1.userValidation.createUserValidationSchema), user_controller_1.userController.createUser);
userRouter.get('/profile', auth_1.auth.authUser('student', 'teacher'), user_controller_1.userController.getProfile);
exports.default = userRouter;
