import { useEffect, useCallback, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AxiosResponse, AxiosError } from "axios";
import { create } from "zustand";
import SecureLS from "secure-ls";

import { storageName } from "./useauth.variables";
import { PropsStorageAuth } from "./useauth.types";
import { PropsFethDataFunction } from "@/hooks/network/useRequest/userequest.types";
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

const useAuth = (requireBe?: "client" | "employee") => {
  const [isLoading, setIsLoading] = useState(!!requireBe);
  const dataRef = useRef<AxiosResponse | null>(null);

  const {
    actions: { fethData },
  } = useRequest({ forceUpdate: false });

  const {
    state,
    actions: { loginInState, logoutInState },
  } = StorageAuth();

  const router = useRouter();
  const pathname = usePathname();

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
      }
    );
  };

  const safeFeth = useCallback(
    async (
      request: PropsFethDataFunction,
      onSuccess?: (res: AxiosResponse) => void,
      onError?: (err: AxiosError) => void
    ): Promise<void> => {
      setIsLoading(true);

      const saveData = (res: AxiosResponse) => {
        if (!request.url.includes("check_auth")) {
          dataRef.current = res.data;
        }
      };

      fethData(
        request,
        (res) => {
          saveData(res);
          setIsLoading(false);
          onSuccess?.(res);
        },
        (err) => {
          if (err.status === 401) {
            fethData(
              { url: "session/refresh_token/", method: "POST" },
              () =>
                fethData(
                  request,
                  (res) => {
                    saveData(res);
                    onSuccess?.(res);
                  },
                  onError,
                  () => setIsLoading(false)
                ),
              (err) => {
                if (err.status === 401) {
                  router.push(`/login?redirectTo=${pathname}`);
                } else {
                  logoutInState();
                }
                setIsLoading(false);
              }
            );
          } else {
            logoutInState();
            setIsLoading(false);
          }
        }
      );
    },
    [fethData, router, pathname, logoutInState]
  );

  useEffect(() => {
    secureLS = secureLS ?? new SecureLS({ encodingType: "aes" });
    if (requireBe) {
      safeFeth(
        {
          url: "session/check_auth/",
          method: "POST",
          content: { restriction: requireBe },
        },
        (res) => loginInState(res.data)
      );
    } else {
      const authUser = secureLS.get(storageName);
      if (authUser) loginInState(authUser);
    }
  }, [requireBe, safeFeth, loginInState, logoutInState]);

  return {
    state,
    network: { isLoading, data: dataRef.current },
    actions: { login, logout, safeFeth },
  };
};

export default useAuth;
