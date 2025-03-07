import { useRouter } from "next/navigation";
import useRequest from "@/hooks/network/useRequest";
import StorageAuth from "./useauth.storage";

import { sessionEP } from "@APISCMapping/endpoints";

export const useAuthState = () => StorageAuth((storage) => storage.state);

export const useAuthActions = () => {
  const router = useRouter();
  const { loginInState, logoutInState } = StorageAuth(
    (storage) => storage.actions
  );

  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const login = (email: string, password: string, redirectTo: string): void => {
    fetchData({
      request: {
        url: sessionEP.login,
        method: "POST",
        data: { email, password },
      },
      modalTitleWhenError: "Erro ao efetuar o login",
      onSuccess: (res) => {
        loginInState(res.data);
        router.push(redirectTo);
      },
    });
  };

  const logout = () => {
    fetchData({
      request: {
        url: sessionEP.logout,
        method: "POST",
      },
      modalTitleWhenError: "Erro ao efetuar o logout",
      onSuccess: () => {
        logoutInState();
        router.push("/");
      },
    });
  };

  return {
    actions: { login, logout },
    network: { isLoading },
  };
};

export default useAuthState;
