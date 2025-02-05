import xss from 'xss';
import type { Request, Response, NextFunction } from 'express';

type RequestBody = Record<string, string>;

const sanitize = (req: Request, res: Response, next: NextFunction): void => {
  const sanitizeInput = (
    input: string | RequestBody | RequestBody[]
  ): string | RequestBody | RequestBody[] | unknown => {
    if (typeof input === 'string') {
      return xss(input);
    } else if (Array.isArray(input)) {
      return input.map(sanitizeInput) as RequestBody[];
    } else if (typeof input === 'object' && input !== null) {
      return Object.keys(input).reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sanitizeInput(input[key]);
        return acc;
      }, {});
    }
    return input;
  };

  req.body = sanitizeInput(req.body);
  next();
};

export const sanitizeAndJSON = (req: Request, res: Response, next: NextFunction): void => {
  const sanitizeInput = (
    input: string | RequestBody | RequestBody[]
  ): string | RequestBody | RequestBody[] | unknown => {
    if (typeof input === 'string') {
      return xss(input);
    } else if (Array.isArray(input)) {
      return input.map(sanitizeInput) as RequestBody[];
    } else if (typeof input === 'object' && input !== null) {
      return Object.keys(input).reduce<Record<string, unknown>>((acc, key) => {
        try {
          acc[key] = JSON.parse(sanitizeInput(input[key]) as string);
        } catch (e) {
          console.error(e);
          acc[key] = sanitizeInput(input[key]);
        }

        return acc;
      }, {});
    }
    return input;
  };

  req.body = sanitizeInput(req.body);
  next();
};

export default sanitize;
