"use client";

import { useState, useEffect } from "react";
import { baseUrlWs } from "@APISCMapping/endpoints";

import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

const useWebSocket = <T,>(relativeUrl: string) => {
  const [data, setData] = useState<T | null>(null);
  const { addNewModal } = useModalActions();

  useEffect(() => {
    const ws = new WebSocket(baseUrlWs + relativeUrl);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setData(data);
    };

    ws.onerror = (error: Event) => {
      const errorMessage = (error as ErrorEvent).message;
      addNewModal(
        <Modal
          title="Erro ao conectar ao WebSocket"
          message={errorMessage ?? "Erro desconhecido."}
        />
      );
    };

    return () => ws.close();
  }, [relativeUrl, addNewModal]);

  return data;
};

export default useWebSocket;
