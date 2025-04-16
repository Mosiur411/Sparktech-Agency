import { Router } from "express";
import authRouter from "../module/auth/auth.router";
import adminRouter from "../module/admin/admin.router";
import userRouter from "../module/user/user.router";
import busRouter from "../module/bus/bus.router";
import studentRoute from "../module/student/student.router";
import mealRouter from "../module/meal/meal.router";
import canteenstaffRoute from "../module/canteenstaff/canteenstaff.router";
import facultRoute from "../module/faculty/faculty.router";
import classscheduleRoute from "../module/classschedule/classschedule.router";
import courseRouter from "../module/course/course.router";
import preOrderRouter from "../module/preorder/preorder.router";
import eventRouter from "../module/event/event.router";
import dashboardRouter from "../module/dashboard/dashboard.router";
import researchRoute from "../module/research/research.router";


const router = Router();
const moduleRoutes = [

    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/admin',
        route: adminRouter
    },
    {
        path: '/dashboard',
        route: dashboardRouter
    },
    {
        path: '/user',
        route: userRouter
    },
    {
        path:'/bus',
        route:busRouter
    },{
        path:'/student',
        route: studentRoute
    },{
        path:'/meal',
        route: mealRouter
    },
    {
        path: '/canteenstaff',
        route: canteenstaffRoute
    },
    {
        path: '/student',
        route: studentRoute
    },
    {
        path: '/faculty',
        route: facultRoute
    },
    {
        path: '/classschedule',
        route: classscheduleRoute
    },
    {
        path: '/course',
        route: courseRouter
    },
    {
        path:'/preOrder',
        route:preOrderRouter
    },
    {
        path:'/events',
        route:eventRouter
    },
    {
        path:'/research',
        route:researchRoute
    }

];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;