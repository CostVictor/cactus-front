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
      secure: false, // process.env.NODE_ENV === "production"
      sameSite: "strict",
      expires: 365,
    }),
  removeItem: () => Cookies.remove(cookieName),
};

const StorageAuth = create<PropsStorageAuth>()(
  persist(
    (set) => ({
      state: {
        isAuthenticated: false,
        user: null,
      },
      actions: {
        loginInState: (user) =>
          set(() => ({
            state: {
              isAuthenticated: true,
              user,
            },
          })),
        logoutInState: () =>
          set(() => ({
            state: {
              isAuthenticated: false,
              user: null,
            },
          })),
      },
    }),
    {
      name: cookieName,
      storage: createJSONStorage(() => StorageCookie),
      partialize: (storage) => ({ state: storage.state }),
    }
  )
);

export default StorageAuth;
