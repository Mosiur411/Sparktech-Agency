import { z } from "zod";

 const createCourseSchema = z.object({
    body:z.object({
    course_code: z.string().min(1, "Course code is required"),
    course_name: z.string().min(1, "Course name is required"),
    credits: z.number().positive("Credits must be a positive number"),
    department: z.string().min(1, "Department is required"),
    prerequisites: z.array(z.string()).optional()
            
})
  });

  const updateCourseSchema = z.object({
    body:z.object({
    course_code: z.string().min(1, "Course code is required").optional(),
    course_name: z.string().min(1, "Course name is required").optional(),
    credits: z.number().positive("Credits must be a positive number").optional(),
    department: z.string().min(1, "Department is required").optional(),
    prerequisites: z.array(z.string()).optional().optional()
            
})
  });

 export const courseValidation = {
    createCourseSchema,
    updateCourseSchema,
  }