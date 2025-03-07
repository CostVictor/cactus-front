"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { PropsUseRequest, PropsFetchDataFunction } from "./userequest.types";
import { errorExtractor } from "./userequest.utils";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";
import cactusAPI from "@/services/axios/cactusAPI";

const useRequest = <T,>(props?: PropsUseRequest) => {
  const { initFetchData, config } = props || {};

  const defaultConfig = {
    axiosInstance: cactusAPI,
    forceLoadingRequest: true,
    defaultErrorTitle: "Erro na Requisição",
    showErrorModal: true,
    ...config,
  };

  const dataRef = useRef<T | null>(null);
  const initialRequestMadeRef = useRef(false);

  const { addNewModal } = useModalActions();
  const [isLoading, setIsLoading] = useState<boolean>(
    defaultConfig.forceLoadingRequest ? initFetchData !== undefined : false
  );

  console.log("render");

  const fetchData = useCallback(
    async ({
      request,
      modalTitleWhenError,
      onSuccess,
      onError,
      onFinally,
    }: PropsFetchDataFunction): Promise<void> => {
      if (defaultConfig.forceLoadingRequest) setIsLoading(true);

      try {
        const res = await defaultConfig.axiosInstance.request(request);
        dataRef.current = res.data as T;
        onSuccess?.(res);
      } catch (err: any) {
        onError?.(err);
        if (defaultConfig.showErrorModal) {
          addNewModal(
            <Modal
              title={modalTitleWhenError || defaultConfig.defaultErrorTitle}
              message={errorExtractor(err)}
            />
          );
        }
      } finally {
        if (defaultConfig.forceLoadingRequest) setIsLoading(false);
        onFinally?.();
      }
    },
    [
      addNewModal,
      defaultConfig.axiosInstance,
      defaultConfig.forceLoadingRequest,
      defaultConfig.defaultErrorTitle,
      defaultConfig.showErrorModal,
    ]
  );

  useEffect(() => {
    if (initFetchData && !initialRequestMadeRef.current) {
      fetchData(initFetchData);
      initialRequestMadeRef.current = true;
    }
  }, [initFetchData, fetchData]);

  return {
    info: {
      data: dataRef.current,
      isLoading,
    },
    actions: { fetchData },
  };
};

export default useRequest;
