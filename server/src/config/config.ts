export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  corsOrigins: process.env.CORS_ORIGINS || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'SDFW34589JCGH90ER6NJdfg34lkjdff9g80ke6',
  cookieDomain: process.env.COOKIE_DOMAIN || 'localhost',
};
