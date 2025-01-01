import { ERROR_MESSAGE } from '../constants/error';
import { HTTP_STATUS } from '../constants/httpStatus';
import { ROLE } from '../data_structures/enums';
import { IShipmentDetails, ITrackingDetails } from '../data_structures/interfaces';
import { CommonType } from '../data_structures/types';
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

  update: async (
    shipmentId: string,
    updateDetails: Record<string, CommonType>,
    userId: string
  ): Promise<IShipmentDetails | undefined> => {
    try {
      const updater = await userModel.getById(userId);

      if (!updater) {
        throw new DetailedError(ERROR_MESSAGE.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND_RESPONSE_CODE);
      }

      const shipment = await shipmentModel.update(shipmentId, updateDetails);

      return shipment;
    } catch (error) {
      DetailedError.handleError(error);
    }
  },

  track: async (
    shipmentId: string,
    userId: string,
    userRole: string
  ): Promise<ITrackingDetails | undefined> => {
    try {
      const user = await userModel.getById(userId);

      if (!user) {
        throw new DetailedError(ERROR_MESSAGE.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND_RESPONSE_CODE);
      }

      const shipment = await shipmentModel.getById(shipmentId);

      if (!shipment) {
        throw new DetailedError(
          ERROR_MESSAGE.SHIPMENT_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND_RESPONSE_CODE
        );
      }

      if (shipment.sender.id !== userId && userRole !== ROLE.ADMIN) {
        throw new DetailedError(
          ERROR_MESSAGE.UNAUTHORIZED_ROLE,
          HTTP_STATUS.UNAUTHORIZED_RESPONSE_CODE
        );
      }

      return { shipmentId: shipment.id!, trackingStatus: shipment.trackingStatus };
    } catch (error) {
      DetailedError.handleError(error);
    }
  },

  getAll: async (): Promise<IShipmentDetails[] | undefined> => {
    try {
      const shipments = await shipmentModel.getAll();

      return shipments;
    } catch (error) {
      DetailedError.handleError(error);
    }
  },

  getByUserId: async (userId: string): Promise<IShipmentDetails[] | undefined> => {
    try {
      const sender = await userModel.getById(userId);

      if (!sender) {
        throw new DetailedError(ERROR_MESSAGE.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND_RESPONSE_CODE);
      }

      const shipments = await shipmentModel.getByUserId(userId);

      if (!shipments) {
        throw new DetailedError(
          ERROR_MESSAGE.SHIPMENT_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND_RESPONSE_CODE
        );
      }

      return shipments;
    } catch (error) {
      DetailedError.handleError(error);
    }
  },
};
