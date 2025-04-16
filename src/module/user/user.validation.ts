import { z } from "zod";

export const UserSchemaValidation = z.object({
  body:z.object({
  name: z.string().min(1, "Name is required"),
  gmail: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contact: z.string().min(10, "Contact number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  role: z.enum(["admin", "student", "faculty", "guest", "canteen_staff"]),
  profile_picture: z.string().url("Invalid URL").optional(),
  registration_date: z.coerce.date(),
  last_login: z.coerce.date().optional(),
  status: z.enum(["unblocked", "blocked"]),
})
});
