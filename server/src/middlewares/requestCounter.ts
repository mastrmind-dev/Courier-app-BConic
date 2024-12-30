import type { Request, Response, NextFunction } from 'express';

const requestCounts: Record<string, number> = {};

const requestCounter = (req: Request, res: Response, next: NextFunction): void => {
  const ip = req.ip;

  if (ip) {
    if (!requestCounts[ip]) requestCounts[ip] = 1;
    else requestCounts[ip]++;

    console.log(`IP: ${ip} - Request Count: ${requestCounts[ip]}`);
  } else {
    console.log('IP: Unknown - Request Count: Unknown');
  }

  next();
};

export default requestCounter;
