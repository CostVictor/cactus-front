import { useForm, FormProvider } from "react-hook-form";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";
import useRequest from "@/hooks/network/useRequest";

import Form from "@/components/form/Form";
import TextField from "@/components/form/TextField";
import FormattedField from "@/components/form/FormattedField";

import { apiHTTP } from "@api/endpoints";
import { PropsAddItem } from "./additem.types";
import style from "./additem.module.scss";

const AddItem = ({ nameCategory }: PropsAddItem) => {
  const { removeModal } = useModalActions();
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const formId = "form-create-item";
  const form = useForm();

  const { snack } = apiHTTP;

  return (
    <Modal
      formMode
      title={`Criar Item em ${nameCategory}`}
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
          className={style.form_add_item}
          onSubmit={(data) =>
            fetchData({
              request: {
                url: snack.category(nameCategory),
                method: "POST",
                data,
              },
              modalTitleWhenError: `Erro ao Criar o Item`,
              onSuccess: () => removeModal(),
            })
          }
        >
          <TextField
            name="name"
            label="Nome do item"
            config={{ writing: { capitalize: "all" } }}
            required
          />
          <FormattedField name="price" label="Preço" type="price" required />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default AddItem;
