import { FormProvider, useForm } from "react-hook-form";
import { useMemo } from "react";

import { filterDifferences } from "@/utils/filters";
import useRequest from "@/hooks/network/useRequest";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";

import Form from "@/components/form/Form";
import Button from "@/components/form/Button";
import OptionsField from "@/components/form/OptionsField";
import { PropsOptions } from "@/components/form/OptionsField";

import { apiHTTP } from "@api/endpoints";

import RemoveComposition from "./subcomponents/RemoveComposition";
import { PropsEditComposition } from "./editcomposition.types";

const EditComposition = ({
  dayName,
  ingredientName,
  currentChoiceNumber,
  quantityFieldSingleChoice,
}: PropsEditComposition) => {
  const { addNewModal, removeModal } = useModalActions();
  const { lunch } = apiHTTP;

  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const formId = "form-edit-composition";
  const form = useForm();

  const optionsToMoveComposition = useMemo(() => {
    const options = [
      { name: "Múltipla escolha", value: "0" },
    ] as PropsOptions[];

    for (let i = 1; i <= quantityFieldSingleChoice; i++) {
      options.push({
        name: `Bloco de escolha única ${i}`,
        value: i.toString(),
      });
    }

    options.push({
      name: "Novo bloco de escolha única",
      value: (quantityFieldSingleChoice + 1).toString(),
    });

    return options;
  }, [quantityFieldSingleChoice]);

  return (
    <Modal
      formMode
      title={`Editar ${ingredientName} no Prato de ${dayName}`}
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
          onSubmit={(data) => {
            const difference = filterDifferences(
              {
                config_choice_number: currentChoiceNumber.toString(),
              },
              data
            );

            if (Object.keys(difference).length) {
              data.config_choice_number = parseInt(data.config_choice_number);

              fetchData({
                request: {
                  url: lunch.composition(dayName, ingredientName),
                  method: "PATCH",
                  data,
                },
                modalTitleWhenError: "Erro ao Editar o Vínculo",
                onSuccess: () => removeModal(),
              });
            } else {
              removeModal();
            }
          }}
        >
          <OptionsField
            type="radio"
            name="config_choice_number"
            label={`Mover o ingrediente ${ingredientName} para:`}
            options={optionsToMoveComposition}
            config={{
              initChecked: currentChoiceNumber.toString(),
            }}
            required
          />
        </Form>
      </FormProvider>

      <p className="marker"></p>

      <Button
        text="Remover Vínculo"
        onClick={() =>
          addNewModal(
            <RemoveComposition
              dayName={dayName}
              ingredientName={ingredientName}
            />
          )
        }
      />
    </Modal>
  );
};

export default EditComposition;
