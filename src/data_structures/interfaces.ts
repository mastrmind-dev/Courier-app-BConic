export interface IUserDetails {
  email: string;
  password: string;
  confirmPassword?: string;
  firstname: string;
  lastname: string;
  address: string;
  contactNumber: string;
  role: string;
}

export interface ICreateUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  contactNumber: string;
  role: string;
}

export interface ILogin {
  email: string;
  password: string;
}
