import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';

import { config } from './config/config';
import { swaggerSetup } from './lib/swagger';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.corsOrigins,
  })
);
app.use(helmet());

app.use('/health', (req, res) => {
  res.send('OK');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSetup));

export const runApp = () => {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
    if (config.env === 'development')
      console.log(`Swagger docs available at http://localhost:${config.port}/api-docs`);
  });
};
