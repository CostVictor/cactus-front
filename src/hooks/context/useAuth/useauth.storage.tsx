import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import Cookies from "js-cookie";

import { cookieName } from "./useauth.variables";
import { PropsStorageAuth } from "./useauth.types";

// Storage Cookie personalizado.
const StorageCookie = {
  getItem: () => Cookies.get(cookieName) ?? null,
  setItem: (_: string, value: string) =>
    Cookies.set(cookieName, value, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    }),
  removeItem: () => Cookies.remove(cookieName),
};

const StorageAuth = create<PropsStorageAuth>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      loginInState: (user) => set(() => ({ isAuthenticated: true, user })),
      logoutInState: () => set(() => ({ isAuthenticated: false, user: null })),
    }),
    {
      name: cookieName,
      storage: createJSONStorage(() => StorageCookie),
    }
  )
);

export default StorageAuth;
