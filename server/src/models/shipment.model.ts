import { IShipmentDetails, IUserDetails } from '../data_structures/interfaces';
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

  getById: async (
    shipmentId: string
  ): Promise<(IShipmentDetails & { sender: IUserDetails }) | null> => {
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
};
