import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

import { config } from './config/config';
import { swaggerSetup } from './lib/swagger';
import authRouter from './routes/auth.router';
import shipmentRouter from './routes/shipment.router';

declare module 'express-serve-static-core' {
  interface Request {
    user: { id: string; role: string };
  }
}

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());

app.use('/health', (req, res) => {
  res.send('OK');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSetup));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/shipment', shipmentRouter);

export const runApp = () => {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
    if (config.env === 'development')
      console.log(`Swagger docs available at http://localhost:${config.port}/api-docs`);
  });
};
