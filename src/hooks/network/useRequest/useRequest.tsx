"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { PropsUseRequest, PropsFetchDataFunction } from "./userequest.types";
import { errorExtractor } from "./userequest.utils";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";
import cactusAPI from "@api/client";
import "@api/interceptor";

const useRequest = <T,>(props?: PropsUseRequest) => {
  const defaultConfig = {
    axiosInstance: cactusAPI,
    forceLoadingRequest: true,
    defaultErrorTitle: "Erro na Requisição",
    showErrorModal: true,
    ...props?.config,
  };

  const dataRef = useRef<T | null>(null);
  const initialRequestMadeRef = useRef(false);

  const { addNewModal } = useModalActions();
  const [isLoading, setIsLoading] = useState<boolean>(
    defaultConfig.forceLoadingRequest
      ? props?.initFetchData !== undefined
      : false
  );

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
    const initFetchData = props?.initFetchData;

    if (initFetchData && !initialRequestMadeRef.current) {
      fetchData(initFetchData);
      initialRequestMadeRef.current = true;
    }
  }, [props?.initFetchData, fetchData]);

  return {
    info: {
      data: dataRef.current,
      isLoading,
    },
    actions: { fetchData },
  };
};

export default useRequest;
