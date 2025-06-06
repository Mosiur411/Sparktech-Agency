"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
        role: zod_1.z.enum(["teacher", "student",]),
    })
});
exports.userValidation = {
    createUserValidationSchema: exports.createUserValidationSchema,
};
