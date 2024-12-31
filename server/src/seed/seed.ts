import bcrypt from 'bcrypt';
import prisma from '../lib/prisma';

const seed = async () => {
  const hashedPassword = await bcrypt.hash('admin', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
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
