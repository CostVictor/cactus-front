"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";
import SecureLS from "secure-ls";

import { storageName } from "./useauth.variables";
import { PropsStorageAuth } from "./useauth.types";
import useRequest from "@/hooks/network/useRequest";

// LocalStorage seguro.
let secureLS: SecureLS;

// Contexto de autenticação da aplicação.
const StorageAuth = create<PropsStorageAuth>((set) => ({
  state: {
    isAuthenticated: false,
    user: null,
  },
  actions: {
    loginInState: (user) => {
      const newState = { isAuthenticated: true, user: user };
      secureLS?.set(storageName, newState);
      set(() => ({ state: newState }));
    },
    logoutInState: () => {
      secureLS?.remove(storageName);
      set(() => ({ state: { isAuthenticated: false, user: null } }));
    },
  },
}));

const useAuth = () => {
  const {
    info: { isLoading },
    actions: { fethData },
  } = useRequest();

  const {
    state,
    actions: { loginInState, logoutInState },
  } = StorageAuth();
  const router = useRouter();

  useEffect(() => {
    // Inicia o secureLS caso seja `undefined`.
    secureLS = secureLS ?? new SecureLS({ encodingType: "aes" });
    const authUser = secureLS.get(storageName);
    if (authUser) {
      loginInState(authUser);
    }
  }, [loginInState]);

  const login = (email: string, password: string, redirectTo: string) =>
    fethData(
      {
        url: "/session/login/",
        method: "POST",
        content: { email, password },
      },
      (res) => {
        loginInState(res.data);
        router.push(redirectTo);
      }
    );

  const logoutAPI = () =>
    fethData(
      {
        url: "/session/logout/",
        method: "POST",
      },
      () => {
        logoutInState();
        router.push("/");
      }
    );

  const logoutLocal = () => logoutInState();

  const refreshToken = (redirectTo?: string) => {
    fethData(
      {
        url: "/session/refresh_token/",
        method: "POST",
      },
      undefined,
      (err) => {
        if (err.status === 401) {
          router.push(`/login?rediretTo=${redirectTo}`);
        }
      }
    );
  };

  return {
    state,
    network: { isLoading },
    actions: { login, logoutAPI, logoutLocal, refreshToken },
  };
};

export default useAuth;
