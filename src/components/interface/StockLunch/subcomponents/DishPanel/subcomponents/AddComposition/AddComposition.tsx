import { useForm, FormProvider } from "react-hook-form";
import Modal from "@/components/display/Modal";

import Form from "@/components/form/Form";
import OptionsField from "@/components/form/OptionsField";

import { PropsAddComposition } from "./addcomposition.types";

const AddComposition = ({ dayName, options }: PropsAddComposition) => {
  const formId = "form-create-composition";
  const form = useForm();

  return (
    <Modal formMode title={`Vincular ao Prato de ${dayName}`}>
      <FormProvider {...form}>
        <Form id={formId} onSubmit={(data) => console.log(data)}>
          <OptionsField
            name="composition"
            label="Selecione os ingredientes de multipla escolha:"
            type="checkbox"
            options={options}
          />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default AddComposition;
