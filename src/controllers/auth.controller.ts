import { Request, Response } from 'express';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../lib/responseHandler';
import { HTTP_STATUS } from '../constants/httpStatus';
import { authService } from '../services/auth.service';
import { SUCCESS_MESSAGE } from '../constants/success';
import { ROLE } from '../data_structures/enums';
import { getCookiesOptions } from '../lib/cookies';

export const authController = {
  signup: async (req: Request, res: Response) => {
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

  login: async (req: Request, res: Response) => {
    try {
      const loginResult = await authService.login(req.body);

      res.cookie('jwtToken', loginResult!.token, getCookiesOptions());

      return SUCCESS_RESPONSE(
        res,
        HTTP_STATUS.SUCCESS_RESPONSE_CODE,
        { userId: loginResult!.userId },
        SUCCESS_MESSAGE.LOGIN_SUCCESS
      );
    } catch (error) {
      return ERROR_RESPONSE(res, error);
    }
  },
};
