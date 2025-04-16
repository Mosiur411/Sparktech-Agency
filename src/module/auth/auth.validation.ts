import { z } from 'zod'

const loginValidationSchema = z.object({
  body: z.object({
    gmail: z.string({
      required_error: "Email must be provided and must be a string",
  }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

export const AuthValidation = {
  loginValidationSchema,
}

