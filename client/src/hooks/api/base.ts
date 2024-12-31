import axios from 'axios';

const authApiURL = import.meta.env.VITE_AUTH_API_URI
  ? `${import.meta.env.VITE_AUTH_API_URI}/api/v1/auth`
  : 'http://localhost:5000/api/v1/auth';

export const protectedApiURL = import.meta.env.VITE_LAUNCHPAD_API_URI
  ? `${import.meta.env.VITE_LAUNCHPAD_API_URI}/api/v1`
  : 'http://localhost:5000/api/v1';

export const authApi = axios.create({
  baseURL: authApiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const protectedApi = axios.create({
  baseURL: protectedApiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getJwtTokenFromCookie = () => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('JwtToken='))
    ?.split('=')[1];
  return cookieValue;
};

protectedApi.interceptors.request.use(
  (config) => {
    const jwtToken = getJwtTokenFromCookie();
    if (jwtToken) {
      config.headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
