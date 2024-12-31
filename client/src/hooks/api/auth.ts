import { useMutation } from 'react-query';

import { LoginData, RegisterData } from '@/data_structures/types';
import { authApi } from './base';

export const useRegister = () => {
  return useMutation((userData: RegisterData) =>
    authApi.post('/register', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  );
};

export const useLogin = () => {
  return useMutation((userData: LoginData) =>
    authApi.post('/login', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  );
};
