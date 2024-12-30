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
      senderName: `${user.firstname} ${user.lastname}`,
      senderAddress: user.address,
      senderContactNumber: user.contactNumber,
    };
  },

  createUser: async (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    address: string,
    contactNumber: string
  ): Promise<ICreateUser> => {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        firstname,
        lastname,
        address,
        contactNumber,
        role: 'USER',
      },
    });

    return {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      address: user.address,
      contactNumber: user.contactNumber,
      role: user.role,
    };
  },
};
