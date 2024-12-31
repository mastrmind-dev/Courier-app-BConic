import { Request, Response } from 'express';
import { HTTP_STATUS } from '../constants/httpStatus';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../lib/responseHandler';
import { SUCCESS_MESSAGE } from '../constants/success';
import { shipmentService } from '../services/shipment.service';

export const shipmentController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const shipment = await shipmentService.create(req.body, req.user.id);

      return SUCCESS_RESPONSE(
        res,
        HTTP_STATUS.SUCCESS_RESPONSE_CODE,
        { shipment },
        SUCCESS_MESSAGE.SHIPMENT_CREATED
      );
    } catch (error) {
      return ERROR_RESPONSE(res, error);
    }
  },

  track: async (req: Request, res: Response): Promise<void> => {
    try {
      const trackingDetails = await shipmentService.track(req.params.shipmentId, req.user.id);

      return SUCCESS_RESPONSE(
        res,
        HTTP_STATUS.SUCCESS_RESPONSE_CODE,
        { trackingDetails },
        SUCCESS_MESSAGE.SHIPMENT_TRACKED
      );
    } catch (error) {
      return ERROR_RESPONSE(res, error);
    }
  },
};
