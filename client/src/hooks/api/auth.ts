import { useMutation } from 'react-query';

import { RegisterData } from '@/data_structures/types';
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
