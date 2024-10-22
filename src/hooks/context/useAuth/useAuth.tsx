"use client";

import { useRouter } from "next/navigation";

import useRequest from "@/hooks/network/useRequest";
import { PropsStorageAuth } from "./useauth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const StorageAuth = create(
  persist<PropsStorageAuth>(
    (set) => ({
      isAuthenticated: false,
      user: null,

      loginInState: (user) =>
        set(() => ({ isAuthenticated: true, user: user })),
      logoutInState: () => set(() => ({ isAuthenticated: false, user: null })),
    }),
    {
      name: "storageAuth",
    }
  )
);

const useAuth = () => {
  const {
    info: { isLoading },
    actions: { fethData },
  } = useRequest();

  const { isAuthenticated, user, loginInState, logoutInState } = StorageAuth();
  const router = useRouter();

  const login = (email: string, password: string, redirectTo: string) =>
    fethData(
      {
        url: "/session/login/",
        method: "POST",
        content: { email, password },
      },
      (res) => {
        console.log(res.data);
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
    state: { isAuthenticated, user },
    network: { isLoading },
    actions: { login, logoutAPI, logoutLocal, refreshToken },
  };
};

export default useAuth;
