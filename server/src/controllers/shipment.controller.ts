import { Request, Response } from 'express';
import { HTTP_STATUS } from '../constants/httpStatus';
import { SUCCESS_MESSAGE } from '../constants/success';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../lib/responseHandler';
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

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const shipment = await shipmentService.update(req.params.shipmentId, req.body, req.user.id);

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
      const trackingDetails = await shipmentService.track(req.params.shipmentId, req.user.id, req.user.role);

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

  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const shipments = await shipmentService.getAll();

      return SUCCESS_RESPONSE(
        res,
        HTTP_STATUS.SUCCESS_RESPONSE_CODE,
        { shipments },
        SUCCESS_MESSAGE.SHIPMENTS_FETCHED
      );
    } catch (error) {
      return ERROR_RESPONSE(res, error);
    }
  },

  getByUserId: async (req: Request, res: Response): Promise<void> => {
    try {
      const shipments = await shipmentService.getByUserId(req.user.id);

      return SUCCESS_RESPONSE(
        res,
        HTTP_STATUS.SUCCESS_RESPONSE_CODE,
        { shipments },
        SUCCESS_MESSAGE.SHIPMENTS_FETCHED
      );
    } catch (error) {
      return ERROR_RESPONSE(res, error);
    }
  },
};
