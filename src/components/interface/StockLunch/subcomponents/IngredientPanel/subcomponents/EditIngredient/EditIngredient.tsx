import { useForm, FormProvider } from "react-hook-form";

import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import Form from "@/components/form/Form";
import FormattedField from "@/components/form/FormattedField";
import TextField from "@/components/form/TextField";
import Button from "@/components/form/Button";

import RemoveIngredient from "./subcomponents/RemoveIngredient";

import { FieldValues } from "react-hook-form";
import { filterDifferences } from "@/utils/filters";
import { EditIngredientProps } from "./editingredient.types";
import { apiHTTP } from "@api/endpoints";

import style from "./editingredient.module.scss";

const EditIngredient = ({ ingredient }: EditIngredientProps) => {
  const { addNewModal, removeModal } = useModalActions();
  const { lunch } = apiHTTP;

  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const formId = "form-edit-ingredient";
  const form = useForm();

  /**
   * Função responsável por processar o envio do formulário de edição do ingrediente.
   * Compara os dados atuais do ingrediente com os dados fornecidos pelo usuário
   * e envia apenas as diferenças para a API.
   *
   * @param {FieldValues} data - Os dados do formulário enviados pelo usuário.
   */
  const handleSubmit = (data: FieldValues) => {
    const differences = filterDifferences(ingredient, data);
    if (Object.keys(differences).length) {
      fetchData({
        request: {
          url: lunch.ingredient(ingredient.name),
          method: "PATCH",
          data: differences,
        },
        modalTitleWhenError: "Erro ao Editar o Ingrediente",
        onSuccess: () => removeModal(),
      });
    } else {
      removeModal();
    }
  };

  return (
    <Modal
      formMode
      title={`Editar ${ingredient.name}`}
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
          className={style.form_edit_ingredient}
        >
          <TextField
            name="name"
            label="Nome"
            config={{
              initValue: ingredient.name,
              writing: { capitalize: "all" },
            }}
            required
          />

          <p className="marker">Defina um valor para acrescimos (Opcional)</p>
          <FormattedField
            name="additional_charge"
            label="Valor por acrescimo"
            type="price"
            config={{
              valueRules: { custom: { price: () => true } },
              initValue: ingredient.additional_charge ?? "",
            }}
            message="R$ 0,00 não acrescenta valor."
          />
          <p className="marker"></p>
        </Form>
      </FormProvider>
      <Button
        type="button"
        text="Excluir Ingrediente"
        onClick={() =>
          addNewModal(<RemoveIngredient ingredientName={ingredient.name} />)
        }
      />
    </Modal>
  );
};

export default EditIngredient;
