export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  corsOrigins: process.env.CORS_ORIGINS || 'http://localhost:3000',
};
