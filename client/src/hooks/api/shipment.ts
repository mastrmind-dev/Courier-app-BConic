import { useMutation, useQuery } from 'react-query';
import { protectedApi } from './base';
import { ShipmentData } from '@/data_structures/types';
import { IShipmentDetails, IUpdateTrackingStatus } from '@/data_structures/interfaces';

export const useCreateShipment = () => {
  return useMutation((shipmentData: ShipmentData) =>
    protectedApi.post('shipment/create', shipmentData)
  );
};

export const useGetShipmentsByUserId = () => {
  return useQuery(
    ['shipmentsByUser'],
    async () => {
      const res = await protectedApi.get(`shipment/by-user`);
      return res.data.data.shipments as IShipmentDetails[];
    },
    {
      enabled: false,
    }
  );
};

export const useGetAllShipments = () => {
  return useQuery(
    ['shipmentByAdmin'],
    async () => {
      const res = await protectedApi.get(`shipment/all`);
      return res.data.data.shipments as IShipmentDetails[];
    },
    {
      enabled: false,
    }
  );
};

export const useTrackShipment = () => {
  return useMutation((shipmentId: string) => protectedApi.get(`shipment/track/${shipmentId}`));
};

export const useUpdateTrackingStatus = () => {
  return useMutation((updateTrackDetails: IUpdateTrackingStatus) =>
    protectedApi.patch(`shipment/tracking-status/${updateTrackDetails.shipmentId}`, {
      trackingStatus: updateTrackDetails.trackingStatus,
    })
  );
};
