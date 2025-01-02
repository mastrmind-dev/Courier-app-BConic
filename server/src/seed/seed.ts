import bcrypt from 'bcrypt';
import prisma from '../lib/prisma';
import { ROLE } from '../data_structures/enums';

const seed = async () => {
  const existingAdminUser = await prisma.user.findUnique({
    where: {
      email: 'admin@example.com',
    },
  });

  if (existingAdminUser) {
    await prisma.user.delete({
      where: {
        email: 'admin@example.com',
      },
    });
    console.log('Existing admin user deleted');
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: ROLE.ADMIN,
      firstName: 'Admin',
      lastName: 'User',
      address: '123 Admin St',
      contactNumber: '+1234567890',
    },
  });

  console.log('Admin user created:', adminUser);
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
