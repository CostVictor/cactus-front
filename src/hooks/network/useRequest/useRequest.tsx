import { AxiosResponse } from "axios";
import { useState } from "react";

import { PropsErrorResponse, PropsFethDataFunction } from "./userequest.types";
import cactusAPI from "@/services/axios/cactus-api";
import useModal from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

const useRequest = (defaultTitleError = "Erro", axionInstance = cactusAPI) => {
  const [data, setData] = useState<AxiosResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    actions: { addNewModal },
  } = useModal();

  /**
   * Envia a requisição.
   */
  const fethData = async (
    { url, method, content, config }: PropsFethDataFunction,
    onSuccess?: (data: AxiosResponse) => void
  ) => {
    setIsLoading(true);
    try {
      const res = await axionInstance.request({
        url,
        method,
        data: content,
        ...config,
      });
      setData(res);

      if (onSuccess) {
        onSuccess(res);
      }
    } catch (err: any) {
      let errorMessage: string | string[] =
        "A API do sistema não respondeu à requisição.";

      const errorResponse: PropsErrorResponse = err.response?.data;
      if (errorResponse) {
        // Obtem o(s) erro(s) da requição.
        errorMessage = Object.values(errorResponse).flat();
      }

      addNewModal(<Modal title={defaultTitleError} message={errorMessage} />);
    } finally {
      setIsLoading(false);
    }
  };

  return { info: { data, isLoading }, actions: { fethData } };
};

export default useRequest;
