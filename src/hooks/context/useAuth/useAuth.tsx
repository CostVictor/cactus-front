"use client";

import { useRouter } from "next/navigation";

import useRequest from "@/hooks/network/useRequest";
import { PropsStorageAuth } from "./useauth.types";
import { create } from "zustand";

const StorageAuth = create<PropsStorageAuth>((set) => ({
  state: {
    isAuthenticated: false,
    user: null,
  },
  actions: {
    loginInState: (user) =>
      set(() => ({ state: { isAuthenticated: true, user: user } })),
    logoutInState: () =>
      set(() => ({ state: { isAuthenticated: false, user: null } })),
  },
}));

const useAuth = () => {
  const {
    state,
    actions: { loginInState, logoutInState },
  } = StorageAuth();

  const {
    actions: { fethData },
  } = useRequest();

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

  return { state, actions: { login, logoutAPI, logoutLocal, refreshToken } };
};

export default useAuth;
