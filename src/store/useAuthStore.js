import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoading: true,
  isLoggedIn: undefined,
  user: undefined,
  loading: (status) =>
    set((state) => ({
      isLoading: status,
    })),
  login: (user) => {
    set((state) => ({
      isLoading: false,
      isLoggedIn: true,
      user,
    }));
  },
  logout: () =>
    set((state) => ({
      isLoggedIn: false,
      user: undefined,
    })),
}));

export default useAuthStore;
