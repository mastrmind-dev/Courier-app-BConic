export type SignUpFormFieldsType =
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'firstName'
  | 'lastName'
  | 'address'
  | 'contactNumber';

export type RegisterData = {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  address: string;
  contactNumber: string;
};
