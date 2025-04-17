"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const student_controller_1 = require("./student.controller");
const studentRouter = express_1.default.Router();
studentRouter.post('/enrolled-courses', auth_1.auth.authUser('student'), student_controller_1.StudentController.enrolledCoursesStudent);
exports.default = studentRouter;
