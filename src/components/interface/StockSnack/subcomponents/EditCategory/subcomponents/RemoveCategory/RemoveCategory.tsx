import useModalActions from "@/hooks/context/useModal";
import useRequest from "@/hooks/network/useRequest";

import Modal from "@/components/display/Modal";
import { stockSnackEP } from "@APISCMapping/endpoints";
import { PropsRemoveCategory } from "./removecategory.types";

const RemoveCategory = ({ categoryName }: PropsRemoveCategory) => {
  const { removeModal } = useModalActions();
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest(undefined, {
    standardDisplayError: "Erro ao apagar a categoria",
  });

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
                url: stockSnackEP.category(categoryName),
                method: "DELETE",
              },
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
