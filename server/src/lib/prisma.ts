import { PrismaClient } from '@prisma/client';
import { config } from '../config/config';

let prisma: PrismaClient;
if (config.env === 'production') {
  prisma = new PrismaClient();
} else if (config.env === 'development') {
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) globalWithPrisma.prisma = new PrismaClient();
  prisma = globalWithPrisma.prisma;
} else {
  throw new Error('Unknown NODE_ENV');
}

export default prisma;
