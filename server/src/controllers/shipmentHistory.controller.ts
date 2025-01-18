import { Request, Response } from 'express';
import { HTTP_STATUS } from '../constants/httpStatus';
import { SUCCESS_MESSAGE } from '../constants/success';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../lib/responseHandler';
import { shipmentHistoryService } from '../services/shipmentHistory.service';

export const shipmentHistoryController = {
  getHistoryByShipmentId: async (req: Request, res: Response): Promise<void> => {
    try {
      const shipment = await shipmentHistoryService.getHistoryByShipmentId(req.params.shipmentId);

      return SUCCESS_RESPONSE(
        res,
        HTTP_STATUS.SUCCESS_RESPONSE_CODE,
        { shipment },
        SUCCESS_MESSAGE.SHIPMENTS_FETCHED
      );
    } catch (error) {
      return ERROR_RESPONSE(res, error);
    }
  },
};
