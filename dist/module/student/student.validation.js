"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsValidation = void 0;
const zod_1 = require("zod");
const createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.literal("student"),
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        followedTeachers: zod_1.z.array(zod_1.z.string()).optional()
    })
});
exports.studentsValidation = {
    createStudentValidationSchema,
};
