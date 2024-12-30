import { ERROR_MESSAGE } from '../constants/error';
import { HTTP_STATUS } from '../constants/httpStatus';
import { IShipmentDetails, ITrackingDetails } from '../data_structures/interfaces';
import { DetailedError } from '../lib/detailedError';
import { shipmentModel } from '../models/shipment.model';
import { userModel } from '../models/user.model';

export const shipmentService = {
  create: async (
    shipmentDetails: IShipmentDetails,
    userId: string
  ): Promise<IShipmentDetails | undefined> => {
    try {
      const sender = await userModel.getById(userId);

      if (!sender) {
        throw new DetailedError(ERROR_MESSAGE.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND_RESPONSE_CODE);
      }

      const shipment = await shipmentModel.create(shipmentDetails, userId);

      return shipment;
    } catch (error) {
      DetailedError.handleError(error);
    }
  },

  track: async (shipmentId: string, userId: string): Promise<ITrackingDetails | undefined> => {
    try {
      const sender = await userModel.getById(userId);

      if (!sender) {
        throw new DetailedError(ERROR_MESSAGE.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND_RESPONSE_CODE);
      }

      const shipment = await shipmentModel.getById(shipmentId);

      if (!shipment) {
        throw new DetailedError(
          ERROR_MESSAGE.SHIPMENT_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND_RESPONSE_CODE
        );
      }

      if (shipment.sender.id !== userId) {
        throw new DetailedError(
          ERROR_MESSAGE.UNAUTHORIZED_USER,
          HTTP_STATUS.UNAUTHORIZED_RESPONSE_CODE
        );
      }

      return { shipmentId: shipment.id!, trackingStatus: shipment.trackingStatus };
    } catch (error) {
      DetailedError.handleError(error);
    }
  },
};
