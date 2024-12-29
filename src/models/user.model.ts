import bcrypt from 'bcrypt';
import { ICreateUser, IUserDetails } from '../data_structures/interfaces';
import prisma from '../lib/prisma';

export const userModel = {
  getUserByEmail: async (email: string): Promise<(IUserDetails & { id: string }) | null> => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
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
