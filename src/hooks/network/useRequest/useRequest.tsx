import { AxiosResponse, AxiosError } from "axios";
import { useCallback, useState, useRef, useEffect } from "react";
import { PropsErrorResponse, PropsFethDataFunction } from "./userequest.types";

import Modal from "@/components/display/Modal";
import useModal from "@/hooks/context/useModal";
import cactusAPI from "@/services/axios/cactus-api";

const useRequest = (
  forceUpdate = false,
  defaultTitleError = "Erro",
  axionInstance = cactusAPI
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dataRef = useRef<AxiosResponse | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    actions: { addNewModal },
  } = useModal();

  useEffect(() => {
    return () => {
      // Aborta a requisição caso alguma esteja em andamento quando o componente for destruido.
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
  const fethData = useCallback(
    async (
      { url, method, content, config }: PropsFethDataFunction,
      onSuccess?: (res: AxiosResponse) => void,
      onError?: (err: AxiosError) => void
    ): Promise<void> => {
      // Cancela a requisição anterior, se houver.
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Cria um novo AbortController para a nova requisição.
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;

      // Força atualização quando envia a requisição.
      if (forceUpdate) {
        setIsLoading(true);
      }

      try {
        const res = await axionInstance.request({
          url,
          method,
          data: content,
          ...config,
          headers: {
            ...config?.headers,
          },
          signal,
        });
        dataRef.current = res;

        if (onSuccess) {
          onSuccess(res);
        }
      } catch (err: any) {
        if (err.name === "CanceledError") return;

        if (!onError) {
          // Extrai a mensagem de erro caso o usuário passe `onError`.
          let errorMessage: string | string[] = "A API não está respondendo.";

          if (err.response) {
            const errorResponse: PropsErrorResponse = err.response?.data;
            if (errorResponse && typeof errorResponse !== "string") {
              // Obtem os erros da requisição.
              errorMessage = Object.values(errorResponse).flat();
            }
          } else if (err.status === 500) {
            errorMessage = "Ocorreu um erro interno na API.";
          }

          addNewModal(
            <Modal title={defaultTitleError} message={errorMessage} />
          );
        } else {
          onError(err);
        }
      } finally {
        abortControllerRef.current = null;

        // Força atualização quando a requisição finaliza.
        if (forceUpdate) {
          setIsLoading(false);
        }
      }
    },
    [forceUpdate, defaultTitleError, axionInstance, addNewModal]
  );

  return {
    info: {
      data: dataRef.current?.data,
      isLoading,
    },
    actions: { fethData },
  };
};

export default useRequest;
