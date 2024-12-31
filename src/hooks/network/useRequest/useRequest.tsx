import { useCallback, useState, useRef, useEffect } from "react";
import { AxiosResponse } from "axios";

import { PropsFethDataFunction, PropsCustomRequest } from "./userequest.types";
import { errorExtractor } from "./userequest.utils";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";
import cactusAPI from "@/services/axios/cactusAPI";

const useRequest = (
  initialRequest?: PropsFethDataFunction,
  custom?: PropsCustomRequest
) => {
  const config = {
    axiosInstance: cactusAPI,
    standardDisplayError: "Erro na Requisição",
    ...custom,
  };

  const dataRef = useRef<AxiosResponse | null>(null);
  const initialRequestMadeRef = useRef(false);

  const { addNewModal } = useModalActions();
  const [isLoading, setIsLoading] = useState<boolean>(
    config.forceLoadingRequest ? initialRequest !== undefined : false
  );

  const fethData = useCallback(
    async ({
      request,
      onSuccess,
      onError,
      onFinally,
    }: PropsFethDataFunction): Promise<void> => {
      if (config.forceLoadingRequest) setIsLoading(true);

      try {
        const res = await config.axiosInstance.request(request);
        dataRef.current = res;
        onSuccess?.(res);
      } catch (err: any) {
        onError?.(err);

        if (config.standardDisplayError) {
          addNewModal(
            <Modal
              title={config.standardDisplayError}
              message={errorExtractor(err)}
            />
          );
        }
      } finally {
        if (config.forceLoadingRequest) setIsLoading(false);
        onFinally?.();
      }
    },
    [
      addNewModal,
      config.axiosInstance,
      config.forceLoadingRequest,
      config.standardDisplayError,
    ]
  );

  useEffect(() => {
    if (initialRequest && !initialRequestMadeRef.current) {
      fethData(initialRequest);
      initialRequestMadeRef.current = true;
    }
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
