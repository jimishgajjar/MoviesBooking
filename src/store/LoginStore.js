import { create } from "zustand";

const LoginStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default LoginStore;
