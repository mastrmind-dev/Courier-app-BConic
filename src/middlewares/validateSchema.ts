import type { Handler, NextFunction, Request, Response } from 'express';
import Joi, { SchemaMap } from 'joi';
import { HTTP_STATUS } from '../constants/httpStatus';
import { DetailedError } from '../lib/detailedError';
import { ERROR_RESPONSE } from '../lib/responseHandler';

type SupportedKeys = 'params' | 'body' | 'query';

interface Options {
  params?: SchemaMap;
  body?: SchemaMap;
  query?: SchemaMap;
}

type ExpressJoiValidate = (schemaOptions: Options) => Handler;

export const validationSchema: ExpressJoiValidate =
  (schema: Options) => (req: Request, res: Response, next: NextFunction) => {
    if (!schema) {
      next();
      return;
    }

    const obj: Options = {};
    ['params', 'body', 'query'].forEach((key) => {
      const k: SupportedKeys = key as SupportedKeys;

      if (schema[k]) obj[k] = req[k];
    });

    const joiSchema = Joi.object(schema);
    const { error } = joiSchema.validate(obj);

    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message: string = details
        .map((i: { message: string }) => i.message)
        .join(',')
        ?.replace(/"/g, '')
        ?.replace('body.', '');

      const detailedError: DetailedError = new DetailedError(
        message,
        HTTP_STATUS.BAD_REQUEST_RESPONSE_CODE
      );

      ERROR_RESPONSE(res, detailedError);
    }
  };
