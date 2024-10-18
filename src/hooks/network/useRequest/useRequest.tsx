import { AxiosResponse } from "axios";
import { useState } from "react";

import { PropsFethDataFunction } from "./userequest.types";
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
      let errorMessage = "A API do sistema não respondeu à requisição.";
      const errorResponse = err.response;

      if (errorResponse) {
        // Obtem o erro de servidor da requição.
        const errorData = errorResponse.data.non_field_errors;

        if (errorData) {
          errorMessage = errorData[0];
        }
      }

      addNewModal(<Modal title={defaultTitleError} message={errorMessage} />);
    } finally {
      setIsLoading(false);
    }
  };

  return { info: { data, isLoading }, actions: { fethData } };
};

export default useRequest;
