import { StorageAuth } from "@/hooks/context/useAuth";

import { apiHTTP } from "./endpoints";
import { redirectToLogin } from "./utils";
import cactusAPI from "./client";

cactusAPI.interceptors.response.use(
  response => response,
  async err => {
    const { session } = apiHTTP;
    const config = err.config;

    if (err.response?.status === 401 && !config.url.includes("login") && !config.url.includes("logout")) {
      if (config.url.includes("refresh")) {
        redirectToLogin();
        return Promise.reject(err);
      }

      try {
        await cactusAPI.post(session.refresh);
        return cactusAPI(config);

      } catch (refreshError) {
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    if (err.response?.status === 403 && !config.url.includes("register")) {
      StorageAuth.getState().actions.logoutInState();
      await cactusAPI.post(session.logout);
      window.location.href = "/";
    }

    return Promise.reject(err);
  }
);
