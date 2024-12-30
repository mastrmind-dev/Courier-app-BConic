import { Response } from 'express';
import { DetailedError } from './detailedError';

export const SUCCESS_RESPONSE = (
  res: Response,
  statusCode: number,
  data: object | undefined,
  message: string
) => {
  res.status(statusCode).json({
    data,
    message,
  });
};

export const ERROR_RESPONSE = (res: Response, error: unknown) => {
  const err = error as DetailedError;
  res.status(err.code).json({ error: err.message });
};