import { useRouter } from "next/navigation";
import useRequest from "@/hooks/network/useRequest";
import StorageAuth from "./useauth.storage";

import { sessionEP } from "@APISCMapping/endpoints";

const useAuth = () => {
  const { isAuthenticated, user, loginInState, logoutInState } = StorageAuth();
  const router = useRouter();

  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest();

  const login = (email: string, password: string, redirectTo: string): void => {
    fetchData({
      request: {
        url: sessionEP.login,
        method: "POST",
        data: { email, password },
      },
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
      onSuccess: () => {
        logoutInState();
        router.push("/");
      },
    });
  };

  return {
    state: { isAuthenticated, user },
    actions: { login, logout },
    network: { isLoading },
  };
};

export default useAuth;
