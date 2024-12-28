import { StorageAuth } from "@/hooks/context/useAuth";

import { redirectToLogin } from "./cactusapi.utils";
import cactusAPI from "./cactusAPI";

cactusAPI.interceptors.response.use(
  response => response,
  async err => {
    const config = err.config;

    if (err.response?.status === 401 && !config.url.includes("login")) {
      if (config.url.includes("refresh")) {
        redirectToLogin();
        return Promise.reject(err);
      }

      try {
        await cactusAPI.post("/session/refresh_token/");
        return cactusAPI(config);

      } catch (refreshError) {
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    if (err.response?.status === 403 && !config.url.includes("register")) {
      console.log("403");
      StorageAuth.getState().logoutInState();
      await cactusAPI.post("/session/logout/");
      window.location.href = "/";
    }

    return Promise.reject(err);
  }
);
