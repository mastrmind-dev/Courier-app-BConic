import { ROLE } from '@/data_structures/enums';
import { IUserState } from '@/data_structures/interfaces';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        id: '',
        firstName: '',
        lastName: '',
        role: ROLE.USER,
        email: '',
        setId: (value) => set(() => ({ id: value })),
        setFirstName: (value) => set(() => ({ firstName: value })),
        setLastName: (value) => set(() => ({ lastName: value })),
        setRole: (value) => set(() => ({ role: value })),
        setEmail: (value) => set(() => ({ email: value })),
        clearData: () =>
          set(() => ({
            id: '',
            firstName: '',
            lastName: '',
            role: ROLE.USER,
            email: '',
          })),
      }),
      {
        name: 'user-storage',
      }
    )
  )
);

export default useUserStore;
