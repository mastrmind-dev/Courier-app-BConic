import { Shipment } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export interface IUserDetails {
  id?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  address: string;
  contactNumber: string;
  role: string;
}

export interface IUserNonSensitiveDetails {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
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

export interface IShipmentHistory {
  id: string;
  status: string;
  metadata?: JsonValue;
  timestamp: Date;
  shipmentId: string;
  shipment: Shipment;
  createdAt: Date;
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
