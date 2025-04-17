import { z } from "zod";

export const createUserValidationSchema = z.object({
  body:z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["teacher", "student",]),
})
});

export const userValidation = {
  createUserValidationSchema,
}