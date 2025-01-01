import { useMutation } from 'react-query';

import { LoginData, RegisterData } from '@/data_structures/types';
import { authApi } from './base';

export const useRegister = () => {
  return useMutation((userData: RegisterData) => authApi.post('/register', userData));
};

export const useLogin = () => {
  return useMutation((userData: LoginData) => authApi.post('/login', userData));
};

export const useLogout = () => {
  return useMutation(() => authApi.post('/logout'));
};
