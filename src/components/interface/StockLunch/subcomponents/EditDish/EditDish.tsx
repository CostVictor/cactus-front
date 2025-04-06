import { FormProvider, useForm, FieldValues } from "react-hook-form";

import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";

import { filterDifferences } from "@/utils/filters";
import { apiHTTP } from "@api/endpoints";

import Form from "@/components/form/Form";
import AreaField from "@/components/form/AreaField";
import FormattedField from "@/components/form/FormattedField";
import TimeField from "@/components/form/TimeField";

import Modal from "@/components/display/Modal";
import { PropsEditDish } from "./editdish.types";
import style from "./editdish.module.scss";

const EditDish = ({ dish }: PropsEditDish) => {
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest();

  const { removeModal } = useModalActions();
  const { lunch } = apiHTTP;

  const formId = "form-edit-dish";
  const form = useForm();

  const handleSubmit = (data: FieldValues) => {
    const differences = filterDifferences(dish, data);
    if (Object.keys(differences).length) {
      fetchData({
        request: {
          url: lunch.dish(dish.day_name),
          method: "PATCH",
          data: differences,
        },
        modalTitleWhenError: "Erro ao Editar o Prato",
        onSuccess: () => removeModal(),
      });
    } else {
      removeModal();
    }
  };

  return (
    <Modal
      formMode
      title={`Editar Prato de ${dish.day_name}`}
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
          className={style.form_edit_dish}
          onSubmit={handleSubmit}
        >
          <FormattedField
            name="price"
            type="price"
            label="Preço base do prato"
            config={{ initValue: dish.price }}
            required
          />

          <AreaField
            name="description"
            label="Descrição do prato"
            config={{ initValue: dish.description ?? "" }}
          />

          <p className="marker">Horários de funcionamento (Opcionais)</p>
          <TimeField
            name="initial_deadline"
            label="Horário de início"
            type="time"
            config={{ initValue: dish.initial_deadline ?? undefined }}
            message={`Define o horário em que podem iniciar os pedidos de almoços da ${dish.day_name}-feira.`}
          />
          <TimeField
            name="deadline"
            label="Horário de encerramento"
            type="time"
            config={{ initValue: dish.deadline ?? undefined }}
            message={`Define o horário em que os pedidos de almoços da ${dish.day_name}-feira serão encerrados.`}
          />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default EditDish;
