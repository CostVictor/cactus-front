import { useCallback, useState, useRef } from "react";
import { AxiosResponse, AxiosError } from "axios";

import {
  PropsCustomRequest,
  PropsErrorResponse,
  PropsFethDataFunction,
} from "./userequest.types";

import Modal from "@/components/display/Modal";
import useModal from "@/hooks/context/useModal";
import cactusAPI from "@/services/axios/cactus-api";

const useRequest = (custom?: PropsCustomRequest, axiosInstance = cactusAPI) => {
  const {
    forceUpdate = true,
    initLoading = false,
    titleError = "Erro",
  } = custom ?? {};

  const [isLoading, setIsLoading] = useState(initLoading);
  const dataRef = useRef<AxiosResponse | null>(null);

  const {
    actions: { addNewModal },
  } = useModal();

  const fethData = useCallback(
    async (
      { url, method, content, config }: PropsFethDataFunction,
      onSuccess?: (res: AxiosResponse) => void,
      onError?: (err: AxiosError) => void,
      onFinally?: () => void
    ): Promise<void> => {
      if (forceUpdate) setIsLoading(true);

      try {
        const res = await axiosInstance.request({
          url,
          method,
          data: content,
          ...config,
        });
        dataRef.current = res;

        if (onSuccess) onSuccess(res);
      } catch (err: any) {
        if (onError) {
          onError(err);
        } else {
          let errorMessage: string | string[] = "A API não está respondendo.";
          if (err.response) {
            const errorResponse: PropsErrorResponse = err.response.data;
            if (errorResponse && typeof errorResponse !== "string") {
              errorMessage = Object.values(errorResponse).flat();
            }
          }
          addNewModal(<Modal title={titleError} message={errorMessage} />);
        }
      } finally {
        if (forceUpdate) setIsLoading(false);
        if (onFinally) onFinally();
      }
    },
    [axiosInstance, addNewModal, forceUpdate, titleError]
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
