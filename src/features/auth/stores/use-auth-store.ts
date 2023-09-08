import { User } from '@/features/user/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  logout: () => void;
  setUser: (user: User) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser(user) {
        set((state) => ({
          ...state,
          user,
          isAuthenticated: true,
        }));
      },
      logout() {
        set((state) => ({
          ...state,
          user: null,
          isAuthenticated: false,
        }));
      },
    }),
    {
      name: 'auth',
    },
  ),
);

export default useAuthStore;
