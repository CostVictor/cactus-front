import { useCallback, useState, useRef, useEffect } from "react";
import { AxiosResponse } from "axios";

import { PropsFethDataFunction, PropsCustomRequest } from "./userequest.types";
import { errorExtractor } from "./userequest.utils";

import Modal from "@/components/display/Modal";
import useModal from "@/hooks/context/useModal";
import cactusAPI from "@/services/axios/cactusAPI";

const useRequest = (
  initialRequest?: PropsFethDataFunction,
  custom?: PropsCustomRequest
) => {
  const {
    axiosInstance = cactusAPI,
    forceLoadingRequest = true,
    showError = { title: "Erro na Requisição" },
  } = custom ?? {};

  const dataRef = useRef<AxiosResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(
    forceLoadingRequest ? initialRequest !== undefined : false
  );

  const {
    actions: { addNewModal },
  } = useModal();

  const fethData = useCallback(
    async ({
      request,
      onSuccess,
      onError,
      onFinally,
    }: PropsFethDataFunction): Promise<void> => {
      if (forceLoadingRequest) setIsLoading(true);

      try {
        const res = await axiosInstance.request(request);
        dataRef.current = res;
        onSuccess?.(res);
      } catch (err: any) {
        onError?.(err);

        if (showError) {
          addNewModal(
            <Modal title={showError.title} message={errorExtractor(err)} />
          );
        }
      } finally {
        if (forceLoadingRequest) setIsLoading(false);
        onFinally?.();
      }
    },
    [axiosInstance, addNewModal, forceLoadingRequest, showError]
  );

  useEffect(() => {
    if (initialRequest) fethData(initialRequest);
  }, [initialRequest, fethData]);

  return {
    info: {
      data: dataRef.current?.data,
      isLoading,
    },
    actions: { fethData },
  };
};

export default useRequest;
