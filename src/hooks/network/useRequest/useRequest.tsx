"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { PropsfetchDataFunction, PropsCustomRequest } from "./userequest.types";
import { errorExtractor } from "./userequest.utils";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";
import cactusAPI from "@/services/axios/cactusAPI";

const useRequest = <T,>(
  initialRequest?: PropsfetchDataFunction,
  custom?: PropsCustomRequest
) => {
  const config = {
    axiosInstance: cactusAPI,
    standardDisplayError: "Erro na Requisição",
    forceLoadingRequest: true,
    ...custom,
  };

  const dataRef = useRef<T | null>(null);
  const initialRequestMadeRef = useRef(false);

  const { addNewModal } = useModalActions();
  const [isLoading, setIsLoading] = useState<boolean>(
    config.forceLoadingRequest ? initialRequest !== undefined : false
  );

  const fetchData = useCallback(
    async ({
      request,
      onSuccess,
      onError,
      onFinally,
    }: PropsfetchDataFunction): Promise<void> => {
      if (config.forceLoadingRequest) setIsLoading(true);

      try {
        const res = await config.axiosInstance.request(request);
        dataRef.current = res.data as T;
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
      fetchData(initialRequest);
      initialRequestMadeRef.current = true;
    }
  }, [initialRequest, fetchData]);

  return {
    info: {
      data: dataRef.current,
      isLoading,
    },
    actions: { fetchData },
  };
};

export default useRequest;
