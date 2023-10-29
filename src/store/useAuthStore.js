import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: undefined,
  user: undefined,
  login: (user) => {
    set((state) => ({
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
