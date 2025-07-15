"use client";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";

import useRequest from "@/hooks/network/useRequest";
import { apiHTTP } from "@api/endpoints";

import { PropsCancelModal } from "./cancelmodal.types";

const CancelModal = ({ orderId }: PropsCancelModal) => {
  const { removeModal } = useModalActions();
  const { record } = apiHTTP.order;

  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  return (
    <Modal
      title="Cancelar Pedido"
      message={[
        "Ao cancelar este pedido, ele será excluído, removido dos registros do solicitante e os itens relacionados serão devolvidos ao estoque.",
        "Está ação é irreversível. Tem certeza de que deseja continuar?",
      ]}
      buttons={[
        { text: "Voltar", onClick: () => removeModal() },
        {
          text: "Cancelar Pedido",
          appearance: "principal",
          onClick: () =>
            fetchData({
              request: { url: record(orderId), method: "DELETE" },
              onSuccess: () => removeModal(),
            }),
          isLoading,
        },
      ]}
      formMode
    />
  );
};

export default CancelModal;
