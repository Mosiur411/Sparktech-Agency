
import { z } from "zod";

const createStudentValidationSchema = z.object({
  body: z.object({
    role: z.literal("student"),
    student_id: z.string().min(1, "Student ID is required"),
    name: z.string().min(1, "Name is required"),
    gmail: z.string().email(),
    contact: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number"),
    address: z.string().min(1, "Address is required"),
    program: z.string().min(1, "Program is required"),
    year_of_study: z.number().int().min(1, "Year of study must be at least 1"),
    semester: z.string().min(1, "Semester is required"),
    profile_picture: z.string().optional(),
    preferences: z.object({
      language: z.string().min(1, "Language is required"),
      notification_preferences: z.object({
        email_notifications: z.boolean(),
        sms_notifications: z.boolean(),
        push_notifications: z.boolean(),
      }),
    }),
    academic_info: z.object({
      current_gpa: z.number().min(0, "GPA cannot be negative").max(4, "GPA cannot exceed 4.0"),
      major: z.string().min(1, "Major is required"),
      minor: z.string().optional(),
    }),
    emergency_contact: z.object({
      name: z.string().min(1, "Emergency contact name is required"),
      relationship: z.string().min(1, "Relationship is required"),
      contact: z.string().min(1, "Contact is required"),
    }),
    status: z.enum(["unblocked", "blocked"]),
  })
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    role: z.literal("student").optional(),
    student_id: z.string().min(1, "Student ID is required").optional(),
    name: z.string().min(1, "Name is required").optional(),
    gmail: z.string().email().optional(),
    contact: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number").optional(),
    address: z.string().min(1, "Address is required").optional(),
    year_of_study: z.number().int().min(1, "Year of study must be at least 1").optional(),
    semester: z.string().min(1, "Semester is required").optional(),
    profile_picture: z.string().optional(),
    preferences: z.object({
      language: z.string().min(1, "Language is required").optional(),
      notification_preferences: z.object({
        email_notifications: z.boolean().optional(),
        sms_notifications: z.boolean().optional(),
        push_notifications: z.boolean().optional(),
      }).optional(),
    }).optional(),
    academic_info: z.object({
      current_gpa: z.number().min(0, "GPA cannot be negative").max(4, "GPA cannot exceed 4.0").optional(),
      major: z.string().min(1, "Major is required").optional(),
      minor: z.string().optional().optional(),
    }).optional(),
    emergency_contact: z.object({
      name: z.string().min(1, "Emergency contact name is required").optional(),
      relationship: z.string().min(1, "Relationship is required").optional(),
      contact: z.string().min(1, "Contact is required").optional(),
    }).optional(),
    status: z.enum(["unblocked", "blocked"]).optional(),
  })
});






export const studentsValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}