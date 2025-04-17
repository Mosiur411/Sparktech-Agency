"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("../module/auth/auth.router"));
const user_router_1 = __importDefault(require("../module/user/user.router"));
const course_router_1 = __importDefault(require("../module/course/course.router"));
const topic_router_1 = __importDefault(require("../module/topic/topic.router"));
const lesson_router_1 = __importDefault(require("../module/lesson/lesson.router"));
const student_router_1 = __importDefault(require("../module/student/student.router"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_router_1.default,
    },
    {
        path: '/user',
        route: user_router_1.default,
    },
    {
        path: '/course',
        route: course_router_1.default,
    },
    {
        path: '/lesson',
        route: lesson_router_1.default,
    },
    {
        path: '/topic',
        route: topic_router_1.default,
    },
    {
        path: '/student',
        route: student_router_1.default,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
