import { InputJsonValue } from '@prisma/client/runtime/library';
import { IShipmentHistory } from '../data_structures/interfaces';
import { CommonType } from '../data_structures/types';
import prisma from '../lib/prisma';

export const shipmentHistoryModel = {
  create: async (
    status: string,
    metadata: Record<string, CommonType>,
    shipmentId: string
  ): Promise<IShipmentHistory> => {
    const shipment = await prisma.shipmentStatusHistory.create({
      data: {
        status,
        metadata: metadata as InputJsonValue,
        shipmentId,
      },
      include: {
        shipment: true,
      },
    });

    return shipment;
  },

  getHistoryByShipmentId: async (shipmentId: string): Promise<IShipmentHistory[]> => {
    const history = await prisma.shipmentStatusHistory.findMany({
      where: {
        shipmentId,
      },
      include: {
        shipment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return history;
  },
};
