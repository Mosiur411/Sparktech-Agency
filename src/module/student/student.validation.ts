
import { z } from "zod";

const createStudentValidationSchema = z.object({
  body: z.object({
    role: z.literal("student"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string(),
    followedTeachers: z.array(z.string()).optional()
  })
});




export const studentsValidation = {
  createStudentValidationSchema,
}