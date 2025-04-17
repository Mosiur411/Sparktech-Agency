import { z } from "zod";

const quizSchema = z.object({
  question: z.string().min(1, "Quiz question is required"),
  options: z.array(z.string().min(1)).min(1, "At least one option is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

const createTopicSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Topic title is required"),
    content: z.string().min(1, "Topic content is required"),
    quiz: quizSchema.optional(),
  }),
});

const updateTopicSSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Topic title is required").optional(),
    teacher: z.string().min(1, "Teacher ID is required").optional(),
    content: z.string().min(1, "Topic content is required").optional(),
    quiz: quizSchema.optional(),
  }),
});

export const topicValidation = {
  createTopicSchema,
  updateTopicSSchema,
};
