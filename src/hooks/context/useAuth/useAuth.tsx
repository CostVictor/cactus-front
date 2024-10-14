"use client";

import { PropsUseAuth } from "./useauth.types";
import { create } from "zustand";

const useAuth = create<PropsUseAuth>((set) => ({
  state: {
    isAuthenticated: false,
    user: { name: "Victor", role: "employee" },
  },
  actions: {
    login: () => set((storage) => ({})),
    logout: () => set((storage) => ({})),
  },
}));

export default useAuth;
