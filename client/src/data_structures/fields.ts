import { z } from 'zod';
import { createShipmentFormSchema, loginFormSchema, signUpFormSchema } from './schemas';

export const signUpFormFields: {
  name: keyof z.infer<typeof signUpFormSchema>;
  placeholder: string;
  label: string;
}[] = [
  {
    name: 'email',
    placeholder: 'Email',
    label: 'Email',
  },
  {
    name: 'password',
    placeholder: 'password',
    label: 'Password',
  },
  {
    name: 'confirmPassword',
    placeholder: 'Confirm password',
    label: 'Confirm Password',
  },
  {
    name: 'firstName',
    placeholder: 'First name',
    label: 'First Name',
  },
  {
    name: 'lastName',
    placeholder: 'Last name',
    label: 'Last Name',
  },
  {
    name: 'address',
    placeholder: 'Address',
    label: 'Address',
  },
  {
    name: 'contactNumber',
    placeholder: 'Contact number',
    label: 'Contact Number',
  },
];

export const loginFormFields: {
  name: keyof z.infer<typeof loginFormSchema>;
  placeholder: string;
  label: string;
  type: string;
}[] = [
  {
    name: 'email',
    placeholder: 'Email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'password',
    placeholder: 'Password',
    label: 'Password',
    type: 'password',
  },
];

export const createShipmentFormFields: {
  name: keyof z.infer<typeof createShipmentFormSchema>;
  placeholder: string;
  label: string;
  inputType: string;
  inputValues?: string[];
}[] = [
  {
    name: 'recipientName',
    placeholder: 'Enter recipient name',
    label: 'Recipient Name',
    inputType: 'input',
  },
  {
    name: 'recipientContactNumber',
    placeholder: 'Enter contact number',
    label: 'Contact Number',
    inputType: 'input',
  },
  {
    name: 'recipientAddress',
    placeholder: 'Enter address',
    label: 'Address',
    inputType: 'input',
  },
  {
    name: 'recipientEmail',
    placeholder: 'Enter email address',
    label: 'Email',
    inputType: 'input',
  },
  {
    name: 'weight',
    placeholder: 'Enter weight in kg',
    label: 'Weight (kg)',
    inputType: 'input',
  },
  {
    name: 'serviceType',
    placeholder: 'Select service type',
    label: 'Service Type',
    inputType: 'dropdown',
    inputValues: ['Standard', 'Express', 'Economy'],
  },
  {
    name: 'goodType',
    placeholder: 'Select good type',
    label: 'Good Type',
    inputType: 'dropdown',
    inputValues: ['Fragile', 'Electronic', 'Perishable', 'Flammable'],
  },
  {
    name: 'packagingType',
    placeholder: 'Select packaging type',
    label: 'Packaging Type',
    inputType: 'dropdown',
    inputValues: ['Box', 'Envelop'],
  },
  {
    name: 'paymentMethod',
    placeholder: 'Select payment method',
    label: 'Payment Method',
    inputType: 'dropdown',
    inputValues: ['Cash on delivery', 'Credit card', 'Online'],
  },
];
