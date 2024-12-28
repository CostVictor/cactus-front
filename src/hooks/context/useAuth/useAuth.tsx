import { useRouter } from "next/navigation";
import useRequest from "@/hooks/network/useRequest";
import StorageAuth from "./useauth.storage";
import Cookies from "js-cookie";

const useAuth = () => {
  const { isAuthenticated, user, loginInState, logoutInState } = StorageAuth();
  const router = useRouter();

  const {
    info: { isLoading },
    actions: { fethData },
  } = useRequest();

  const login = (email: string, password: string, redirectTo: string): void => {
    fethData(
      {
        url: "/session/login/",
        method: "POST",
        content: { email, password },
      },
      (res) => {
        loginInState(res.data);
        console.log(Cookies.get("cookie_auth"));
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

  return {
    state: { isAuthenticated, user },
    actions: { login, logout },
    network: { isLoading },
  };
};

export default useAuth;
