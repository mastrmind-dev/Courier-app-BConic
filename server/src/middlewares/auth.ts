import type { NextFunction, Response, Request } from 'express';

import { HTTP_STATUS } from '../constants/httpStatus';
import { ERROR_RESPONSE } from '../lib/responseHandler';
import { DetailedError } from '../lib/detailedError';
import { ERROR_MESSAGE } from '../constants/error';
import { ROLE } from '../data_structures/enums';
import { jwt } from '../lib/jwt';

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  const sendUnauthorizedResponse = () => {
    throw new DetailedError(
      ERROR_MESSAGE.UNAUTHORIZED_USER,
      HTTP_STATUS.UNAUTHORIZED_RESPONSE_CODE
    );
  };

  try {
    console.log(req.cookies.jwtToken);
    const cookiesToken = req.cookies.jwtToken;
    const headersToken = req.headers.authorization?.split(' ')[1];
    if (!cookiesToken && !headersToken) sendUnauthorizedResponse();

    const token = cookiesToken || headersToken;
    let decoded: { id: string; role: string };

    try {
      decoded = jwt.verifyToken(token) as { id: string; role: string };
      console.log(decoded);
    } catch {
      decoded = {} as { id: string; role: string };
    }

    if (!decoded || Object.keys(decoded).length === 0) {
      sendUnauthorizedResponse();
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);

    if (error instanceof DetailedError) {
      ERROR_RESPONSE(res, error);
      return;
    }

    const err = new DetailedError(
      ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR_RESPONSE_CODE
    );
    ERROR_RESPONSE(res, err);
  }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user.role !== (ROLE.ADMIN as unknown as string)) {
      const err = new DetailedError(
        ERROR_MESSAGE.UNAUTHORIZED_ROLE,
        HTTP_STATUS.UNAUTHORIZED_RESPONSE_CODE
      );

      ERROR_RESPONSE(res, err);
    }

    next();
  } catch (error) {
    console.error('Error verifying token:', error);

    const err = new DetailedError(
      ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR_RESPONSE_CODE
    );

    ERROR_RESPONSE(res, err);
  }
};
