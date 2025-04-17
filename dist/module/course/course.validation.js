"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = void 0;
const zod_1 = require("zod");
const createCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Course title is required"),
        description: zod_1.z.string().min(1, "Course description is required"),
        lessons: zod_1.z.array(zod_1.z.string()).optional()
    })
});
const updateCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Course title is required").optional(),
        description: zod_1.z.string().min(1, "Course description is required").optional(),
        lessons: zod_1.z.array(zod_1.z.string()).optional()
    })
});
exports.courseValidation = {
    createCourseSchema,
    updateCourseSchema,
};
