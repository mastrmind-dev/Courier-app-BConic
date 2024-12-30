import { ERROR_MESSAGE } from '../constants/error';
import { HTTP_STATUS } from '../constants/httpStatus';

export class DetailedError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }

  static handleError(error: unknown): void {
    console.error('Error::: ', error);

    if (error instanceof DetailedError) {
      throw error;
    }

    throw new DetailedError(
      ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR_RESPONSE_CODE
    );
  }
}
