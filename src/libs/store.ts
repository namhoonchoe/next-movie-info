import { create } from "zustand";

interface LoginState {
  isLoggedIn: boolean;
  setLogIn: (isLoggedIn: LoginState["isLoggedIn"]) => void;
  setLogOut: (isLoggedIn: LoginState["isLoggedIn"]) => void;
}

export const uselogInStore = create<LoginState>()((set) => ({
  isLoggedIn: false,
  setLogIn: () => set(() => ({ isLoggedIn: true })),
  setLogOut: () => set(() => ({ isLoggedIn: false })),
}));
