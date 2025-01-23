import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import Form from "@/components/forms/Form";
import Button from "@/components/forms/Button";

import { FieldValues } from "react-hook-form";
import { filterDifferences } from "@/utils/filters";
import { stockLunchEP } from "@APISCMapping/endpoints";
import { EditIngredientProps } from "./editingredient.types";

const EditIngredient = ({ ingredient }: EditIngredientProps) => {
  const { addNewModal, removeModal } = useModalActions();

  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest(undefined, {
    standardDisplayError: "Erro ao editar o ingrediente",
  });

  /**
   * Função responsável por processar o envio do formulário de edição do ingrediente.
   * Compara os dados atuais do ingrediente com os dados fornecidos pelo usuário
   * e envia apenas as diferenças para a API.
   *
   * @param {FieldValues} data - Os dados do formulário enviados pelo usuário.
   */
  const handleSubmit = (data: FieldValues) => {
    if (data.additional_charge === "R$ 0,00") {
      data.additional_charge = null;
    }

    const differences = filterDifferences(ingredient, data);
    if (Object.keys(differences).length) {
      fetchData({
        request: {
          url: stockLunchEP.ingredient(ingredient.name),
          method: "PATCH",
          data: differences,
        },
        onSuccess: () => removeModal(-1),
      });
    } else {
      removeModal(-1);
    }
  };

  return (
    <Modal title={`Editar ${ingredient.name}`} buttons={null} notOverflow>
      <div style={{ marginBottom: 5 }}>
        {/* <Form
          includeButton={{ text: "Cancelar", onClick: () => removeModal(-1) }}
          defaultButtonSubmitText="Salvar"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        >
          <InputField
            name="name"
            label="Nome"
            config={{ validation: { capitalize: "all" } }}
            value={ingredient.name}
            required
          />

          <p className="marker">
            Defina um valor para acrescimos (R$ 0,00 para remover)
          </p>
          <InputField
            name="additional_charge"
            label="Valor por acrescimo"
            value={ingredient.additional_charge ?? undefined}
            config={{ type: "price", validation: { freeValue: true } }}
          />

          <p className="marker"></p>
          <Button
            text="Excluir Ingrediente"
            type="button"
            onClick={() =>
              addNewModal(
                <Modal
                  title="Confirmar Exclusão"
                  message={`Ao excluir o ingrediente "${ingredient.name}", ele também será removido de todos os pratos que o utilizam.`}
                  buttons={[
                    { text: "Voltar", onClick: () => removeModal(-1) },
                    {
                      text: "Excluir",
                      appearance: "main",
                      onClick: () =>
                        fetchData({
                          request: {
                            url: stockLunchEP.ingredient(ingredient.name),
                            method: "DELETE",
                          },
                          onSuccess: () => {
                            removeModal(-2);
                            removeModal(-1);
                          },
                        }),
                    },
                  ]}
                />
              )
            }
            noShadow
          />
        </Form> */}
      </div>
    </Modal>
  );
};

export default EditIngredient;
