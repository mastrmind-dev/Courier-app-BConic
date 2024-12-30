import swaggerJSDoc from 'swagger-jsdoc';
import { config } from '../config/config';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Courier API Documentation',
      version: '1.0.0',
    },
    servers: [{ url: `http://localhost:${config.port}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['src/routes/*.ts'],
};

export const swaggerSetup = swaggerJSDoc(swaggerOptions);
