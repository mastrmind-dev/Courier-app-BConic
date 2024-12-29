import type { CookieOptions } from 'express';
import { config } from '../config/config';

const expiresInOneDay = 86400000;

export const getCookiesOptions = (): CookieOptions => {
  return {
    httpOnly: false,
    maxAge: expiresInOneDay,
    secure: config.env !== 'development',
    path: '/',
    sameSite: config.env !== 'development' ? 'lax' : 'lax',
    domain: config.env !== 'development' ? config.cookieDomain : 'localhost',
  };
};
