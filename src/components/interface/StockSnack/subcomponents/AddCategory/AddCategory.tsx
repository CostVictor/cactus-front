"use client";

import { useForm, FormProvider } from "react-hook-form";

import useModalActions from "@/hooks/context/useModal";
import useRequest from "@/hooks/network/useRequest";

import Modal from "@/components/display/Modal";
import Form from "@/components/form/Form";
import TextField from "@/components/form/TextField";

import { apiHTTP } from "@api/endpoints";

const AddCategory = () => {
  const { removeModal } = useModalActions();
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const { snack } = apiHTTP;
  const formId = "form-create-category";
  const form = useForm();

  return (
    <Modal
      formMode
      title="Criar Categoria"
      buttons={[
        {
          text: "Cancelar",
          onClick: () => removeModal(),
        },
        {
          text: "Criar",
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
          onSubmit={(data) =>
            fetchData({
              request: {
                url: snack.baseUrl,
                method: "POST",
                data,
              },
              modalTitleWhenError: "Erro ao criar a categoria",
              onSuccess: () => removeModal(),
            })
          }
        >
          <TextField
            name="name"
            label="Nome da Categoria"
            config={{ writing: { capitalize: "all" } }}
            required
          />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default AddCategory;
