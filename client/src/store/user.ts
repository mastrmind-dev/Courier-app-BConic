import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type UserState = {
  status: boolean;
  data: unknown;
  message: string | undefined;
  token: string | undefined;

  setStatus: (value: boolean) => void;
  setData: (value: unknown) => void;
  setMessage: (value: string | undefined) => void;
  setToken: (value: string | undefined) => void;
  clearData: () => void;
};

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        status: false,
        data: undefined,
        message: undefined,
        token: undefined,
        setStatus: (value) => set(() => ({ status: value })),
        setData: (value) => set(() => ({ data: value })),
        setMessage: (value) => set(() => ({ message: value })),
        setToken: (value) => set(() => ({ token: value })),
        clearData: () =>
          set(() => ({
            status: false,
            data: undefined,
            message: undefined,
            token: undefined,
          })),
      }),
      {
        name: 'user-storage',
      }
    )
  )
);

export default useUserStore;
