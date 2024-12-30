export interface IUserDetails {
  id?: string;
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

export interface IShipmentDetails {
  id?: string;
  recipientEmail: string;
  recipientName: string;
  recipientAddress: string;
  recipientContactNumber: string;
  serviceType: string;
  goodType: string;
  weight: number;
  packagingType: string;
  paymentMethod: string;
  trackingStatus: string;
}

export interface IShipmentSenderDetails {
  senderEmail: string;
  senderName: string;
  senderAddress: string;
  senderContactNumber: string;
}

export interface ITrackingDetails {
  shipmentId: string;
  trackingStatus: string;
}
