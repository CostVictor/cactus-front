import { AxiosResponse } from "axios";
import { useState } from "react";

import { PropsErrorResponse, PropsFethDataFunction } from "./userequest.types";
import cactusAPI from "@/services/axios/cactus-api";
import useModal from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";
import Cookies from "js-cookie";

const useRequest = (defaultTitleError = "Erro", axionInstance = cactusAPI) => {
  const [data, setData] = useState<AxiosResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    actions: { addNewModal },
  } = useModal();

  /**
   * Função assíncrona para buscar dados de uma API.
   *
   * @param {Object} params - Os parâmetros para a requisição.
   * @param {string} params.url - A URL da API para a qual a requisição será feita.
   * @param {string} params.method - O método HTTP a ser utilizado (GET, POST, etc.).
   * @param {any} params.content - O conteúdo a ser enviado no corpo da requisição (aplicável para métodos como POST).
   * @param {Object} [params.config] - Configurações adicionais para a requisição (opcional).
   * @param {function} [onSuccess] - Callback a ser chamado se a requisição for bem-sucedida. Recebe a resposta da API como argumento.
   * @param {function} [onError] - Callback a ser chamado se a requisição falhar. Recebe o erro como argumento.
   *
   * @returns {Promise<void>} - Retorna uma Promise que resolve quando a operação é concluída.
   */
  const fethData = async (
    { url, method, content, config }: PropsFethDataFunction,
    onSuccess?: (res: AxiosResponse) => void,
    onError?: (err: any) => void
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const csrftoken = Cookies.get("csrftoken");
      const res = await axionInstance.request({
        url,
        method,
        data: content,
        ...config,
        headers: {
          ...config?.headers,
          "X-CSRFToken": csrftoken,
        },
      });
      setData(res.data);

      if (onSuccess) {
        onSuccess(res);
      }
    } catch (err: any) {
      if (!onError) {
        let errorMessage: string | string[] = "A API não está respondendo.";

        if (err.status !== 500) {
          const errorResponse: PropsErrorResponse = err.response?.data;
          if (errorResponse) {
            // Obtem o(s) erro(s) da requição.
            errorMessage = Object.values(errorResponse).flat();
          }
        } else {
          errorMessage = "Ocorreu um erro interno na API.";
        }

        addNewModal(<Modal title={defaultTitleError} message={errorMessage} />);
      } else {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { info: { data, isLoading }, actions: { fethData } };
};

export default useRequest;
