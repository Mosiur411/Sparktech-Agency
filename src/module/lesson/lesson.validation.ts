import { z } from "zod";

const createLessonSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Course title is required"),
    description: z.string().min(1, "Course description is required"),
    topics: z.array(z.string()).optional()
  })
});

const updateLessonSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Course title is required").optional(),
    description: z.string().min(1, "Course description is required").optional(),
    topics: z.array(z.string()).optional()
  })
});
export const lessonValidation = {
    createLessonSchema,
    updateLessonSchema,
}