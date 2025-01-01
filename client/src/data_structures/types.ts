export type RegisterData = {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  address: string;
  contactNumber: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type ShipmentData = {
  recipientEmail: string;
  recipientName: string;
  recipientAddress: string;
  recipientContactNumber: string;
  serviceType: string;
  goodType: string;
  weight: number;
  packagingType: string;
  paymentMethod: string;
};

export type Role = 'ADMIN' | 'USER';
