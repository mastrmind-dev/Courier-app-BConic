import bcrypt from 'bcrypt';

import { ERROR_MESSAGE } from '../constants/error';
import { HTTP_STATUS } from '../constants/httpStatus';
import { ILogin, IUserDetails } from '../data_structures/interfaces';
import { DetailedError } from '../lib/detailedError';
import { jwt } from '../lib/jwt';
import { userModel } from '../models/user.model';

export const authService = {
  register: async (userDetails: IUserDetails) => {
    try {
      const { email, password, confirmPassword, firstname, lastname, address, contactNumber } =
        userDetails;

      if (password !== confirmPassword) {
        throw new DetailedError(
          ERROR_MESSAGE.CONFIRM_PASSWORD_NOT_MATCH_PASSWORD,
          HTTP_STATUS.BAD_REQUEST_RESPONSE_CODE
        );
      }

      const formattedEmail = email.toLowerCase().trim();

      const user = await userModel.getUserByEmail(formattedEmail);

      if (user) {
        throw new DetailedError(
          ERROR_MESSAGE.USER_ALREADY_EXISTS,
          HTTP_STATUS.CONFLICT_RESPONSE_CODE
        );
      }

      const userId = await userModel.createUser(
        email,
        password,
        firstname,
        lastname,
        address,
        contactNumber
      );

      return userId;
    } catch (error) {
      DetailedError.handleError(error);
    }
  },

  login: async (login: ILogin) => {
    try {
      const { email, password } = login;

      const formattedEmail = email.toLowerCase().trim();
      const user = await userModel.getUserByEmail(formattedEmail);

      if (!user) {
        throw new DetailedError(ERROR_MESSAGE.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND_RESPONSE_CODE);
      }

      const isVerified = await loginVerification(user.password, password);

      if (!isVerified) {
        throw new DetailedError(
          ERROR_MESSAGE.PASSWORD_NOT_MATCH,
          HTTP_STATUS.UNAUTHORIZED_RESPONSE_CODE
        );
      }

      const token = jwt.generateJWT(user.id, user.email, user.role);

      return { token, userId: user.id };
    } catch (error) {
      console.error('Error logging in', error);
      DetailedError.handleError(error);
    }
  },
};

const loginVerification = async (hashedPassword: string, password: string) => {
  return await bcrypt.compare(password, hashedPassword);
};
