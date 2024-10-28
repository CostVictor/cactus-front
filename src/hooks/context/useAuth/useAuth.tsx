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
      secureLS?.set(storageName, user);
      set(() => ({ state: { isAuthenticated: true, user: user } }));
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

  /**
   * Faz login do usuário e redireciona para a URL especificada após o login bem-sucedido.
   * @param {string} email - O email do usuário.
   * @param {string} password - A senha do usuário.
   * @param {string} redirectTo - A URL para redirecionar após o login bem-sucedido.
   * @returns {Promise<void>}
   */
  const login = (
    email: string,
    password: string,
    redirectTo: string
  ): Promise<void> =>
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

  /**
   * Faz logout do usuário e redireciona para a página inicial após o logout bem-sucedido.
   * @returns {Promise<void>}
   */
  const logoutAPI = (): Promise<void> =>
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

  /**
   * Remove o estado de autenticação do usuário armazenado com secureLS no LocalStorage.
   * @returns {void}
   */
  const logoutLocal = (): void => logoutInState();

  /**
   * Atualiza o token de sessão do usuário. Se a atualização falhar com erro 401, redireciona para a página de login.
   * @param {string} [redirectTo] - URL opcional para redirecionar após o login se a atualização do token falhar.
   * @returns {Promise<void>}
   */
  const refreshToken = (redirectTo?: string): Promise<void> =>
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

  return {
    state,
    network: { isLoading },
    actions: { login, logoutAPI, logoutLocal, refreshToken },
  };
};

export default useAuth;
