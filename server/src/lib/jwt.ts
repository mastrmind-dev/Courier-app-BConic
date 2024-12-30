import jsonWebToken from 'jsonwebtoken';
import { config } from '../config/config';

export const jwt = {
  generateSignToken: (email: string): string => {
    const token = jsonWebToken.sign({ email, verificationJWT: true }, config.jwtSecret);
    return token;
  },

  verifyToken: (
    token: string
  ): { id: string; email: string; verificationJWT: boolean; role: string } => {
    return jsonWebToken.verify(token, config.jwtSecret) as {
      id: string;
      email: string;
      verificationJWT: boolean;
      role: string;
    };
  },

  generateJWT: (id: string, email: string, role: string): string => {
    const token = jsonWebToken.sign({ id, email, role }, config.jwtSecret, {
      expiresIn: '1d',
    });

    return token;
  },
};
