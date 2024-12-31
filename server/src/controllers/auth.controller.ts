import { Request, Response } from 'express';
import { HTTP_STATUS } from '../constants/httpStatus';
import { SUCCESS_MESSAGE } from '../constants/success';
import { ROLE } from '../data_structures/enums';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../lib/responseHandler';
import { authService } from '../services/auth.service';
import { getCookiesOptions } from '../lib/cookies';

export const authController = {
  signup: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = await authService.register({ ...req.body, role: ROLE.USER });

      return SUCCESS_RESPONSE(
        res,
        HTTP_STATUS.SUCCESS_RESPONSE_CODE,
        { userId },
        SUCCESS_MESSAGE.USER_CREATED
      );
    } catch (error) {
      return ERROR_RESPONSE(res, error);
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const loginResult = await authService.login(req.body);

      res.cookie('jwtToken', loginResult!.token, getCookiesOptions());

      return SUCCESS_RESPONSE(
        res,
        HTTP_STATUS.SUCCESS_RESPONSE_CODE,
        { user: loginResult!.user },
        SUCCESS_MESSAGE.LOGIN_SUCCESS
      );
    } catch (error) {
      return ERROR_RESPONSE(res, error);
    }
  },

  logout: async (req: Request, res: Response): Promise<void> => {
    try {
      res.cookie('jwtToken', '', getCookiesOptions());

      return SUCCESS_RESPONSE(
        res,
        HTTP_STATUS.SUCCESS_RESPONSE_CODE,
        {},
        SUCCESS_MESSAGE.LOGGED_OUT
      );
    } catch (error) {
      return ERROR_RESPONSE(res, error);
    }
  },
};
