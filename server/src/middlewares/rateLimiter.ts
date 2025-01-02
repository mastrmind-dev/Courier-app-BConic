import rateLimit from 'express-rate-limit';

import type { Request, Response } from 'express';
import { HTTP_STATUS } from '../constants/httpStatus';
import { DetailedError } from '../lib/detailedError';
import { ERROR_RESPONSE } from '../lib/responseHandler';

const rateLimiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 5,
  message: {
    message: 'Too many requests from this IP, please try again after few minutes.',
    status: 429,
  },
  headers: true,
  handler: (req: Request, res: Response) => {
    const err = new DetailedError(
      'Too many requests from this IP',
      HTTP_STATUS.TOO_MANY_REQUESTS_RESPONSE_CODE
    );
    return ERROR_RESPONSE(res, err);
  },
});

export default rateLimiter;
