import { z } from "zod";

export const signUpFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address.' })
    .min(2, {
      message: 'Email must be at least 2 characters.',
    })
    .max(50, {
      message: 'Email must be less than 50 characters',
    }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters.',
    })
    .max(20, {
      message: 'Password must be less than 20 characters',
    }),
  confirmPassword: z
    .string()
    .min(6, {
      message: 'Confirm Password must be at least 6 characters.',
    })
    .max(20, {
      message: 'Confirm Password must be less than 20 characters',
    }),
  firstName: z
    .string()
    .min(1, {
      message: 'First Name must be at least 1 character.',
    })
    .max(50, {
      message: 'First Name must be less than 50 characters',
    }),
  lastName: z
    .string()
    .min(1, {
      message: 'Last Name must be at least 1 character.',
    })
    .max(50, {
      message: 'Last Name must be less than 50 characters',
    }),
  address: z
    .string()
    .min(1, {
      message: 'Address must be at least 1 character.',
    })
    .max(100, {
      message: 'Address must be less than 100 characters',
    }),
  contactNumber: z
    .string()
    .min(10, {
      message: 'Contact Number must be at least 10 characters.',
    })
    .max(15, {
      message: 'Contact Number must be less than 15 characters',
    }),
});

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address.' })
    .min(2, {
      message: 'Email must be at least 2 characters.',
    })
    .max(50, {
      message: 'Email must be less than 50 characters',
    }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters.',
    })
    .max(20, {
      message: 'Password must be less than 20 characters',
    }),
});