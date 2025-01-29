import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import { FieldValues } from "react-hook-form";
import { filterDifferences } from "@/utils/filters";
import { stockSnackEP } from "@APISCMapping/endpoints";
import { EditItemProps } from "./edititem.types";

const EditItem = ({ dataSnack, nameCategory }: EditItemProps) => {
  const { addNewModal, removeModal } = useModalActions();
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>(undefined, {
    standardDisplayError: `Erro ao editar o item ${dataSnack.name}`,
  });

  /**
   * Função responsável por processar o envio do formulário de edição do item.
   * Compara os dados atuais do item com os dados fornecidos pelo usuário
   * e envia apenas as diferenças para a API.
   *
   * @param {FieldValues} data - Os dados do formulário enviados pelo usuário.
   */
  const handleSubmit = (data: FieldValues) => {
    const differences = filterDifferences(dataSnack, data, ["category"]);
    if (Object.keys(differences).length) {
      fetchData({
        request: {
          url: stockSnackEP.item(nameCategory, dataSnack.name),
          method: "PATCH",
          data: differences,
        },
        onSuccess: () => removeModal(),
      });
    } else {
      removeModal();
    }
  };

  return (
    <Modal title={`Editar ${dataSnack.name}`} buttons={null} notOverflow>
      <div style={{ marginBottom: 5 }}>
        {/* <Form
          onSubmit={handleSubmit}
          includeButton={{
            text: "Cancelar",
            onClick: () => removeModal(-1),
          }}
          defaultButtonSubmitText="Salvar"
          isLoading={isLoading}
        >
          <InputField
            name="name"
            label="Nome"
            value={dataSnack.name}
            config={{ validation: { capitalize: "all" } }}
            required
          />
          <InputField
            name="price"
            label="Preço"
            value={dataSnack.price}
            config={{ type: "price" }}
            required
          />
          <InputField
            name="description"
            label="Descrição"
            value={dataSnack.description ?? ""}
          />

          <p className="marker">
            Importante (Evitar edição em horário de pico)
          </p>
          <InputField
            name="quantity_in_stock"
            label="Quantidade em estoque"
            value={dataSnack.quantity_in_stock.toString()}
            config={{ type: "number" }}
            required
          />

          <p className="marker"></p>
          <Button
            text="Excluir Item"
            type="button"
            onClick={() =>
              addNewModal(
                <Modal
                  title="Confirmar Exclusão"
                  message={`Ao excluir o item "${dataSnack.name}", ele não aparecerá mais na lista de itens.`}
                  buttons={[
                    { text: "Voltar", onClick: () => removeModal(-1) },
                    {
                      text: "Excluir",
                      appearance: "main",
                      onClick: () =>
                        fetchData({
                          request: {
                            url: stockSnackEP.item(
                              nameCategory,
                              dataSnack.name
                            ),
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

export default EditItem;
