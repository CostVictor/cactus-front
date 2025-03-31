import { useForm, FormProvider } from "react-hook-form";

import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import Form from "@/components/form/Form";
import OptionsField from "@/components/form/OptionsField";

import { apiHTTP } from "@api/endpoints";
import { PropsAddComposition } from "./addcomposition.types";

const AddComposition = ({
  dayName,
  options,
  choiceNumber = 0,
}: PropsAddComposition) => {
  const { removeModal } = useModalActions();
  const { lunch } = apiHTTP;

  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const formId = "form-create-composition";
  const form = useForm();

  return (
    <Modal
      formMode
      title={`Vincular ao Prato de ${dayName}`}
      buttons={[
        { text: "Cancelar", onClick: () => removeModal() },
        {
          text: "Vincular",
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
          onSubmit={(data) => {
            data.config_choice_number = choiceNumber;

            fetchData({
              request: { url: lunch.dish(dayName), method: "POST", data },
              modalTitleWhenError: "Erro ao Vincular",
              onSuccess: () => removeModal(),
            });
          }}
        >
          <OptionsField
            name="list_ingredients"
            label="Selecione os ingredientes de múltipla escolha:"
            type="checkbox"
            options={options}
            required
          />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default AddComposition;
