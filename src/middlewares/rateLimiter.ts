import rateLimit from 'express-rate-limit';

import type { Request, Response } from 'express';
import { HTTP_STATUS } from '../constants/httpStatus';
import { DetailedError } from '../lib/detailedError';
import { ERROR_RESPONSE } from '../lib/responseHandler';

// Define rate limiter options
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 250, // Limit each IP to 250 requests per windowMs
  message: {
    message: 'Too many requests from this IP, please try again after few minutes.',
    status: 429,
  },
  headers: true, // Add rate limit headers to the response
  handler: (req: Request, res: Response) => {
    const err = new DetailedError(
      'Too many requests from this IP',
      HTTP_STATUS.TOO_MANY_REQUESTS_RESPONSE_CODE
    );
    return ERROR_RESPONSE(res, err);
  },
});

// Export the rate limiter middleware for use in the app
export default rateLimiter;
