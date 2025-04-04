"use client";

import { useState, useEffect } from "react";
import { apiHTTP, apiWS } from "@api/endpoints";

import useRequest from "../useRequest";
import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

const useWebSocket = <T,>(relativeUrl: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantityReset, setQuantityReset] = useState(0);

  const { session } = apiHTTP;

  const {
    actions: { fetchData },
  } = useRequest<null>({ config: { forceLoadingRequest: false } });

  const { addNewModal } = useModalActions();

  useEffect(() => {
    const ws = new WebSocket(apiWS.baseUrl + relativeUrl);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as T;
      setIsLoading(false);
      setData(data);
    };

    ws.onclose = (event: CloseEvent) => {
      switch (event.code) {
        case 4001:
          fetchData({
            request: { url: session.refresh, method: "POST" },
            onSuccess: () => setQuantityReset((prevValue) => prevValue + 1),
            onError: () => (window.location.href = "/login"),
          });
          break;

        case 4003:
          window.location.href = "/";
          break;

        default:
          setIsLoading(false);
          if (event.code !== 1000) {
            addNewModal(
              <Modal
                title="A conexão WebSocket foi fechada"
                message={
                  event.reason ? event.reason : "A API fechou a conexão."
                }
              />
            );
          }
          break;
      }
    };

    return () => ws.close();
  }, [relativeUrl, addNewModal, fetchData, quantityReset, session.refresh]);

  return { data, isLoading };
};

export default useWebSocket;
