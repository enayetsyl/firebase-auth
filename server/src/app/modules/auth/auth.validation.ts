import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    idToken: z.string().min(1, { message: 'ID Token is required' }),
  }),
});

const registerZodSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    displayName: z.string().min(1, { message: 'Display name is required' }),
  }),
});

const forgotPasswordZodSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  registerZodSchema,
  forgotPasswordZodSchema,
};
