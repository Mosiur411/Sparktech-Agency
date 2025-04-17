import { Router } from "express";
import authRouter from "../module/auth/auth.router";
import userRouter from "../module/user/user.router";
import courseRouter from "../module/course/course.router";
import topicRouter from "../module/topic/topic.router";
import lessonRouter from "../module/lesson/lesson.router";

const router = Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/user',
        route: userRouter,
    },
    {
        path: '/course',
        route: courseRouter,
    },
    {
        path: '/lesson',
        route: lessonRouter,
    },
    {
        path: '/topic',
        route: topicRouter,
    },

];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;