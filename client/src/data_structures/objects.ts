import { SignUpFormFieldsType } from './types';

export const signUpFormFields: {
  name: SignUpFormFieldsType;
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
