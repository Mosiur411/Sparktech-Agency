import { z } from "zod";

const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Course title is required"),
    description: z.string().min(1, "Course description is required"),
    lessons: z.array(z.string()).optional()
  })
});

const updateCourseSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Course title is required").optional(),
    description: z.string().min(1, "Course description is required").optional(),
    lessons: z.array(z.string()).optional()
  })
});
export const courseValidation = {
  createCourseSchema,
  updateCourseSchema,
}