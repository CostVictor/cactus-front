import cactusAPI from "./cactusAPI";
import { redirectToLogin } from "./cactusapi.utils";

// Intercepta o erro 401 e tenta atualizar o token.
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

    return Promise.reject(err);
  }
);
