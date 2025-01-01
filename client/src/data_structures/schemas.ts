import { z } from 'zod';

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

export const createShipmentFormSchema = z.object({
  recipientName: z
    .string()
    .min(2, {
      message: 'Recipient name must be at least 2 characters.',
    })
    .max(50, {
      message: 'Recipient name must be less than 50 characters',
    }),
  recipientContactNumber: z.string().max(20, {
    message: 'Contact number must be less than 20 characters',
  }),
  recipientAddress: z
    .string()
    .min(6, {
      message: 'Address must be at least 6 characters.',
    })
    .max(100, {
      message: 'Address must be less than 100 characters',
    }),
  recipientEmail: z.string().email({
    message: 'Please enter a valid email address',
  }),
  serviceType: z.enum(['standard', 'express', 'economy'], {
    required_error: 'Please select a service type',
    invalid_type_error: 'Service type must be standard, express, or economy',
  }),
  goodType: z.enum(['fragile', 'electronic', 'perishable', 'flammable'], {
    required_error: 'Please select a good type',
    invalid_type_error: 'Good type must be fragile, electronic, perishable, or flammable',
  }),
  packagingType: z.enum(['box', 'envelop'], {
    required_error: 'Please select a packaging type',
    invalid_type_error: 'Packaging type must be box or envelop',
  }),
  weight: z
    .string()
    .regex(/^\d+(\.\d+)?$/, {
      message: 'Weight must be a valid number',
    })
    .refine(
      (value) => {
        const num = parseFloat(value);
        return num <= 10;
      },
      {
        message: 'Weight must be less than or equal to 10 kg',
      }
    ),
  paymentMethod: z.enum(['cash on delivery', 'credit card', 'online'], {
    required_error: 'Please select a payment method',
    invalid_type_error: 'Payment method must be cash on delivery, credit card, or online',
  }),
});
