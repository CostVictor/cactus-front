import { useForm, FormProvider } from "react-hook-form";

import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import Form from "@/components/form/Form";
import TextField from "@/components/form/TextField";
import FormattedField from "@/components/form/FormattedField";

import { apiHTTP } from "@api/endpoints";
import style from "./addingredient.module.scss";

const AddIngredient = () => {
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const { removeModal } = useModalActions();
  const { lunch } = apiHTTP;

  const formId = "form-create-ingredient";
  const form = useForm();

  return (
    <Modal
      formMode
      title="Adicionar Ingrediente"
      buttons={[
        { text: "Cancelar", onClick: () => removeModal() },
        {
          text: "Criar",
          appearance: "principal",
          type: "submit",
          isLoading,
          formId,
        },
      ]}
    >
      <FormProvider {...form}>
        <Form
          id={formId}
          className={style.form_add_ingredient}
          onSubmit={(data) =>
            fetchData({
              request: { url: lunch.baseIngredients, method: "POST", data },
              modalTitleWhenError: "Erro ao Criar o Ingrediente",
              onSuccess: () => removeModal(),
            })
          }
        >
          <TextField
            name="name"
            label="Nome"
            config={{ writing: { capitalize: "all" } }}
            required
          />

          <p className="marker">
            Você pode permitir que o cliente peça acrescentado
          </p>
          <FormattedField
            name="additional_charge"
            label="Valor por acrescimo"
            type="price"
            config={{ valueRules: { custom: { price: () => true } } }}
            message="R$ 0,00 não acrescenta valor."
          />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default AddIngredient;
