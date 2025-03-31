import useModalActions from "@/hooks/context/useModal";
import useRequest from "@/hooks/network/useRequest";

import Modal from "@/components/display/Modal";
import { apiHTTP } from "@api/endpoints";

import { PropsRemoveItem } from "./removeitem.types";

const RemoveItem = ({ nameCategory, nameItem }: PropsRemoveItem) => {
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const { removeModal } = useModalActions();
  const { snack } = apiHTTP;

  return (
    <Modal
      formMode="button"
      title="Confirmar Exclusão"
      message={`Ao excluir o item "${nameItem}", ele não aparecerá mais na lista de itens.`}
      buttons={[
        { text: "Voltar", onClick: () => removeModal() },
        {
          text: "Excluir",
          appearance: "principal",
          onClick: () =>
            fetchData({
              request: {
                url: snack.item(nameCategory, nameItem),
                method: "DELETE",
              },
              modalTitleWhenError: `Erro ao Excluir o Item`,
              onSuccess: () => {
                // Remove os dois pop-ups armazenados para a confirmação.
                removeModal();
                removeModal();
              },
            }),
          isLoading,
        },
      ]}
    />
  );
};

export default RemoveItem;
