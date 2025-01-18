import { IShipmentDetails, IUserDetails } from '../data_structures/interfaces';
import { CommonType } from '../data_structures/types';
import prisma from '../lib/prisma';

export const shipmentModel = {
  create: async (
    shipmentDetails: IShipmentDetails,
    senderId: string
  ): Promise<IShipmentDetails & { senderId: string }> => {
    const shipment = await prisma.shipment.create({
      data: {
        ...shipmentDetails,
        senderId,
      },
    });

    return shipment;
  },

  update: async (
    shipmentId: string,
    updateDetails: Record<string, CommonType>
  ): Promise<IShipmentDetails & { senderId: string }> => {
    const shipment = await prisma.shipment.update({
      where: {
        id: shipmentId,
      },
      data: updateDetails,
    });

    return shipment;
  },

  getAll: async (): Promise<IShipmentDetails[]> => {
    const shipments = await prisma.shipment.findMany({
      include: {
        sender: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return shipments;
  },

  getById: async (
    shipmentId: string
  ): Promise<(IShipmentDetails & { sender: IUserDetails }) | null> => {
    console.log('getbyid:::', shipmentId);
    const shipment = await prisma.shipment.findUnique({
      where: {
        id: shipmentId,
      },
      include: {
        sender: true,
      },
    });

    if (!shipment) {
      return null;
    }

    return shipment;
  },

  getByUserId: async (userId: string): Promise<IShipmentDetails[] | null> => {
    const shipments = await prisma.shipment.findMany({
      where: {
        senderId: userId,
      },
      include: {
        sender: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!shipments) {
      return null;
    }

    return shipments;
  },
};
