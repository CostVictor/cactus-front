import { useForm, FormProvider } from "react-hook-form";
import { FieldValues } from "react-hook-form";

import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import Form from "@/components/form/Form";
import TextField from "@/components/form/TextField";
import FormattedField from "@/components/form/FormattedField";
import AreaField from "@/components/form/AreaField";
import Button from "@/components/form/Button";

import { filterDifferences } from "@/utils/filters";
import { apiHTTP } from "@api/endpoints";

import RemoveItem from "./subcomponents/RemoveItem";
import { EditItemProps } from "./edititem.types";
import style from "./edititem.module.scss";

const EditItem = ({ dataSnack, nameCategory }: EditItemProps) => {
  const { addNewModal, removeModal } = useModalActions();
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const { snack } = apiHTTP;

  const formId = "form-edit-item";
  const form = useForm();

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
          url: snack.item(nameCategory, dataSnack.name),
          method: "PATCH",
          data: differences,
        },
        modalTitleWhenError: "Erro ao editar o item",
        onSuccess: () => removeModal(),
      });
    } else {
      removeModal();
    }
  };

  return (
    <Modal
      formMode
      title={`Editar ${dataSnack.name}`}
      buttons={[
        { text: "Cancelar", onClick: () => removeModal() },
        {
          text: "Salvar",
          type: "submit",
          appearance: "principal",
          isLoading,
          formId,
        },
      ]}
    >
      <FormProvider {...form}>
        <Form
          id={formId}
          onSubmit={handleSubmit}
          className={style.form_edit_item}
        >
          <TextField
            name="name"
            label="Nome"
            config={{
              initValue: dataSnack.name,
              writing: { capitalize: "all" },
            }}
            required
          />
          <FormattedField
            name="price"
            label="Preço"
            type="price"
            config={{ initValue: dataSnack.price }}
            required
          />
          <AreaField
            name="description"
            label="Descrição"
            config={{ initValue: dataSnack.description ?? "" }}
          />

          <p className="marker">
            Importante (Evitar edição em horário de pico)
          </p>
          <TextField
            name="quantity_in_stock"
            label="Quantidade em estoque"
            type="number"
            config={{
              initValue: dataSnack.quantity_in_stock.toString(),
              valueRules: {
                custom: {
                  notNegative: (value) =>
                    parseFloat(value) >= 0 ||
                    "A quantidade de itens no estoque deve ser maior ou igual a zero (0).",
                },
              },
            }}
            required
          />
          <p className="marker"></p>
        </Form>
      </FormProvider>

      <Button
        text="Excluir Item"
        type="button"
        onClick={() =>
          addNewModal(
            <RemoveItem nameCategory={nameCategory} nameItem={dataSnack.name} />
          )
        }
      />
    </Modal>
  );
};

export default EditItem;
