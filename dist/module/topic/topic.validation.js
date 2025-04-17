"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicValidation = void 0;
const zod_1 = require("zod");
const quizSchema = zod_1.z.object({
    question: zod_1.z.string().min(1, "Quiz question is required"),
    options: zod_1.z.array(zod_1.z.string().min(1)).min(1, "At least one option is required"),
    correctAnswer: zod_1.z.string().min(1, "Correct answer is required"),
});
const createTopicSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Topic title is required"),
        content: zod_1.z.string().min(1, "Topic content is required"),
        quiz: quizSchema.optional(),
    }),
});
const updateTopicSSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Topic title is required").optional(),
        teacher: zod_1.z.string().min(1, "Teacher ID is required").optional(),
        content: zod_1.z.string().min(1, "Topic content is required").optional(),
        quiz: quizSchema.optional(),
    }),
});
exports.topicValidation = {
    createTopicSchema,
    updateTopicSSchema,
};
