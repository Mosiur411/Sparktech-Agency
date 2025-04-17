"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const auth_1 = require("../../middlewares/auth");
const courseRouter = express_1.default.Router();
courseRouter.post('/', auth_1.auth.authUser('teacher'), (0, validateRequest_1.default)(course_validation_1.courseValidation.createCourseSchema), course_controller_1.courseController.createCourse);
courseRouter.get('/', auth_1.auth.authUser('teacher'), course_controller_1.courseController.getCourse);
courseRouter.get('/:id', auth_1.auth.authUser('teacher'), course_controller_1.courseController.getsingleCourse);
courseRouter.patch('/:id', auth_1.auth.authUser('teacher'), course_controller_1.courseController.updateCourse);
courseRouter.delete('/:id', auth_1.auth.authUser('teacher'), course_controller_1.courseController.deleteCourse);
courseRouter.post('/feedback/:id', auth_1.auth.authUser('student', 'teacher'), (0, validateRequest_1.default)(course_validation_1.courseValidation.feedbacksCourseSchema), course_controller_1.courseController.feedbackCourse);
courseRouter.post('/like/:id', auth_1.auth.authUser('student', 'teacher'), course_controller_1.courseController.likeCourse);
exports.default = courseRouter;
