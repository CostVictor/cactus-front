import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { create } from "zustand";
import SecureLS from "secure-ls";

import { storageName } from "./useauth.variables";
import { PropsStorageAuth } from "./useauth.types";
import useRequest from "@/hooks/network/useRequest";

let secureLS: SecureLS;

const StorageAuth = create<PropsStorageAuth>((set) => ({
  state: {
    isAuthenticated: false,
    user: null,
  },
  actions: {
    loginInState: (user) => {
      secureLS?.set(storageName, user);
      set(() => ({ state: { isAuthenticated: true, user } }));
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

  const login = (email: string, password: string, redirectTo: string): void => {
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
  };

  const logout = () => {
    fethData(
      {
        url: "/session/logout/",
        method: "POST",
      },
      () => {
        logoutInState();
        router.push("/");
      },
      () => {
        // Retira o comportamento padrão de criar um modal de erro.
        return;
      }
    );
  };

  useEffect(() => {
    secureLS = secureLS ?? new SecureLS({ encodingType: "aes" });
    const authUser = secureLS.get(storageName);

    if (authUser) loginInState(authUser);
  }, [loginInState]);

  return {
    state,
    network: { isLoading },
    actions: { login, logout },
  };
};

export default useAuth;
