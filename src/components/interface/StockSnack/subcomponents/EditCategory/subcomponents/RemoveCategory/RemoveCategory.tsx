import useModalActions from "@/hooks/context/useModal";
import useRequest from "@/hooks/network/useRequest";

import Modal from "@/components/display/Modal";
import { PropsRemoveCategory } from "./removecategory.types";
import { apiHTTP } from "@api/endpoints";

const RemoveCategory = ({ categoryName }: PropsRemoveCategory) => {
  const { removeModal } = useModalActions();
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const { snack } = apiHTTP;

  return (
    <Modal
      formMode="button"
      title="Confirmar Exclusão"
      message={`Ao excluir a categoria "${categoryName}", todos os itens relacionados a ela também serão excluídos.`}
      buttons={[
        { text: "Voltar", onClick: () => removeModal() },
        {
          isLoading,
          text: "Excluir",
          appearance: "principal",
          onClick: () =>
            fetchData({
              request: {
                url: snack.category(categoryName),
                method: "DELETE",
              },
              modalTitleWhenError: `Erro ao excluir a categoria ${categoryName}`,
              onSuccess: () => {
                // Remove os dois pop-ups armazenados para a confirmação.
                removeModal();
                removeModal();
              },
            }),
        },
      ]}
    />
  );
};

export default RemoveCategory;
