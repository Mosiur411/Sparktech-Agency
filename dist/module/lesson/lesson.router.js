"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = require("../../middlewares/auth");
const lesson_validation_1 = require("./lesson.validation");
const lesson_controller_1 = require("./lesson.controller");
const lessonRouter = express_1.default.Router();
lessonRouter.post('/', auth_1.auth.authUser('teacher'), (0, validateRequest_1.default)(lesson_validation_1.lessonValidation.createLessonSchema), lesson_controller_1.lessonController.createLesson);
lessonRouter.get('/', auth_1.auth.authUser('teacher'), lesson_controller_1.lessonController.getLesson);
lessonRouter.get('/:id', auth_1.auth.authUser('teacher'), lesson_controller_1.lessonController.getsingleLesson);
lessonRouter.patch('/:id', auth_1.auth.authUser('teacher'), lesson_controller_1.lessonController.updateLesson);
lessonRouter.delete('/:id', auth_1.auth.authUser('teacher'), lesson_controller_1.lessonController.deleteLesson);
exports.default = lessonRouter;
