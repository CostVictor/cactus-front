import useModalActions from "@/hooks/context/useModal";
import useRequest from "@/hooks/network/useRequest";

import Modal from "@/components/display/Modal";
import { PropsRemoveComposition } from "./removecomposition.types";
import { apiHTTP } from "@api/endpoints";

const RemoveComposition = ({
  dayName,
  ingredientName,
}: PropsRemoveComposition) => {
  const { removeModal } = useModalActions();
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const { lunch } = apiHTTP;

  return (
    <Modal
      formMode="button"
      title="Confirmar Remoção"
      message={`Ao remover o vínculo do ingrediente "${ingredientName}" do prato de "${dayName}", ele não estará mais disponível nesse prato.`}
      buttons={[
        { text: "Voltar", onClick: () => removeModal() },
        {
          isLoading,
          text: "Remover",
          appearance: "principal",
          onClick: () =>
            fetchData({
              request: {
                url: lunch.composition(dayName, ingredientName),
                method: "DELETE",
              },
              modalTitleWhenError: "Erro ao Remover o Vínculo",
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

export default RemoveComposition;
