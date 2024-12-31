import bcrypt from 'bcrypt';
import { ICreateUser, IShipmentSenderDetails, IUserDetails } from '../data_structures/interfaces';
import prisma from '../lib/prisma';

export const userModel = {
  getByEmail: async (email: string): Promise<(IUserDetails & { id: string }) | null> => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  },

  getById: async (id: string): Promise<IShipmentSenderDetails | null> => {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return null;
    }

    return {
      senderEmail: user.email,
      senderName: `${user.firstName} ${user.lastName}`,
      senderAddress: user.address,
      senderContactNumber: user.contactNumber,
    };
  },

  createUser: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    contactNumber: string
  ): Promise<ICreateUser> => {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        firstName,
        lastName,
        address,
        contactNumber,
        role: 'USER',
      },
    });

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      contactNumber: user.contactNumber,
      role: user.role,
    };
  },
};
