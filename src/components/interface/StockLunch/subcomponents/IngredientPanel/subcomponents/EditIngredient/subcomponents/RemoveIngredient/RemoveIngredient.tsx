import Modal from "@/components/display/Modal";

import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";

import { apiHTTP } from "@api/endpoints";
import { PropsRemoveIngredient } from "./removeingredient.types";

const RemoveIngredient = ({ ingredientName }: PropsRemoveIngredient) => {
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest();

  const { removeModal } = useModalActions();
  const { lunch } = apiHTTP;

  return (
    <Modal
      formMode="button"
      title="Confirmar Exclusão"
      message={`Ao excluir o ingrediente "${ingredientName}", ele também será removido de todos os pratos que o utilizam.`}
      buttons={[
        { text: "Voltar", onClick: () => removeModal() },
        {
          text: "Excluir",
          appearance: "principal",
          isLoading,
          onClick: () =>
            fetchData({
              request: {
                url: lunch.ingredient(ingredientName),
                method: "DELETE",
              },
              onSuccess: () => {
                // remove os popups de confirmação.
                removeModal();
                removeModal();
              },
            }),
        },
      ]}
    />
  );
};

export default RemoveIngredient;
