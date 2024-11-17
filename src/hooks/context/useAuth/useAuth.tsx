import { useEffect, useCallback, useState, useRef } from "react";
import { AxiosResponse, AxiosError, AxiosInstance } from "axios";
import { useRouter, usePathname } from "next/navigation";
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

const useAuth = (
  requireBe?: "client" | "employee",
  whenAuthenticated?: () => void
) => {
  const [isLoading, setIsLoading] = useState(!!requireBe);
  const ongoingRequests = useRef(0);

  const dataRef = useRef<AxiosInstance | null>(null);
  const whenAuthenticatedRef = useRef(whenAuthenticated);

  const {
    actions: { fethData },
  } = useRequest({ forceUpdate: false });

  const {
    state,
    actions: { loginInState, logoutInState },
  } = StorageAuth();

  const router = useRouter();
  const pathname = usePathname();

  const updateLoading = (isIncrement: boolean) => {
    ongoingRequests.current += isIncrement ? 1 : -1;
    setIsLoading(ongoingRequests.current > 0);
  };

  const login = (email: string, password: string, redirectTo: string): void => {
    updateLoading(true);

    fethData(
      {
        url: "/session/login/",
        method: "POST",
        content: { email, password },
      },
      (res) => {
        loginInState(res.data);
        router.push(redirectTo);
      },
      undefined,
      () => updateLoading(false)
    );
  };

  const logout = () => {
    updateLoading(true);

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
        return;
      },
      () => updateLoading(false)
    );
  };

  const safeFeth = useCallback(
    (
      request: PropsFethDataFunction,
      onSuccess?: (res: AxiosResponse) => void,
      onError?: (err: AxiosError) => void,
      onFinally?: () => void
    ) => {
      updateLoading(true);

      const saveData = (res: AxiosResponse) => {
        if (!request.url.includes("check_auth")) {
          dataRef.current = res.data;
        }
      };

      fethData(
        request,
        (res) => {
          saveData(res);
          onSuccess?.(res);
          onFinally?.();
          updateLoading(false);
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
                  () => {
                    onFinally?.();
                    updateLoading(false);
                  }
                ),
              (err) => {
                if (err.status === 401) {
                  router.push(`/login?redirectTo=${pathname}`);
                } else {
                  logoutInState();
                }
                onFinally?.();
                updateLoading(false);
              }
            );
          } else {
            onFinally?.();
            logoutInState();
            updateLoading(false);
          }
        }
      );
    },
    [fethData, router, pathname, logoutInState]
  );

  useEffect(() => {
    secureLS = secureLS ?? new SecureLS({ encodingType: "aes" });
    const authUser = secureLS.get(storageName);

    if (requireBe) {
      safeFeth(
        {
          url: "session/check_auth/",
          method: "POST",
          content: { restriction: requireBe },
        },
        (res) => {
          loginInState(res.data);
          whenAuthenticatedRef.current?.();
        }
      );
    } else {
      if (authUser) loginInState(authUser);
      whenAuthenticatedRef.current?.();
    }
  }, [requireBe, safeFeth, loginInState]);

  return {
    state,
    network: { data: dataRef.current, isLoading },
    actions: { login, logout, safeFeth },
  };
};

export default useAuth;
