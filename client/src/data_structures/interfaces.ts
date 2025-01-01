import { Role, ShipmentData } from './types';

export interface IError extends Error {
  response?: {
    data: {
      error: string;
    };
  };
}
export interface IUserState {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;

  setId: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setRole: (value: Role) => void;
  setEmail: (value: string) => void;
  clearData: () => void;
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

export interface IShipmentDetails extends ShipmentData {
  id: string;
  trackingStatus: string;
  senderId: string;
  createdAt: string;
  updatedAt: string;
  sender: IUserNonSensitiveDetails;
}

export interface IUpdateTrackingStatus {
  shipmentId: string;
  trackingStatus: string;
}
