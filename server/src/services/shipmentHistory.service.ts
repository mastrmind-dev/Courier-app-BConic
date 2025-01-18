import { ERROR_MESSAGE } from '../constants/error';
import { HTTP_STATUS } from '../constants/httpStatus';
import { IShipmentHistory } from '../data_structures/interfaces';
import { CommonType } from '../data_structures/types';
import { DetailedError } from '../lib/detailedError';
import { shipmentModel } from '../models/shipment.model';
import { shipmentHistoryModel } from '../models/shipmentHistory.model.';
import { userModel } from '../models/user.model';

export const shipmentHistoryService = {
  create: async (
    shipmentId: string,
    updateDetails: Record<string, CommonType>,
    userId: string
  ): Promise<IShipmentHistory | undefined> => {
    try {
      const updater = await userModel.getById(userId);

      if (!updater) {
        throw new DetailedError(ERROR_MESSAGE.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND_RESPONSE_CODE);
      }

      const currentShipment = await shipmentModel.getById(shipmentId);

      if (!currentShipment) {
        throw new DetailedError(
          ERROR_MESSAGE.SHIPMENT_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND_RESPONSE_CODE
        );
      }

      let shipmentHistory;

      if (
        updateDetails.trackingStatus &&
        updateDetails.trackingStatus !== currentShipment.trackingStatus
      ) {
        await shipmentHistoryModel.create(
          updateDetails.trackingStatus as string,
          { location: 'Union Place, Colombo', deliveryMan: 'Sapthaka' }, // This should be filled by admin from the front end. Currently no UI for this.
          shipmentId
        );
      }

      return shipmentHistory;
    } catch (error) {
      DetailedError.handleError(error);
    }
  },

  getHistoryByShipmentId: async (shipmentId: string): Promise<IShipmentHistory[] | undefined> => {
    try {
      const currentShipment = await shipmentModel.getById(shipmentId);

      if (!currentShipment) {
        throw new DetailedError(
          ERROR_MESSAGE.SHIPMENT_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND_RESPONSE_CODE
        );
      }

      const shipmentHistory = await shipmentHistoryModel.getHistoryByShipmentId(shipmentId);

      return shipmentHistory;
    } catch (error) {
      DetailedError.handleError(error);
    }
  },
};
