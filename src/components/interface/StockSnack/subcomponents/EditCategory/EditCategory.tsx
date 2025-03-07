import { FieldValues, useForm, FormProvider } from "react-hook-form";
import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";

import Modal from "@/components/display/Modal";
import Form from "@/components/form/Form";
import TextField from "@/components/form/TextField";
import AreaField from "@/components/form/AreaField";
import Button from "@/components/form/Button";

import RemoveCategory from "./subcomponents/RemoveCategory";
import { filterDifferences } from "@/utils/filters";
import { stockSnackEP } from "@APISCMapping/endpoints";
import { EditCategoryProps } from "./editcategory.types";

const EditCategory = ({ category }: EditCategoryProps) => {
  const { addNewModal, removeModal } = useModalActions();
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const formId = "form-edit-category";
  const form = useForm();

  /**
   * Função responsável por processar o envio do formulário de edição da categoria.
   * Compara os dados atuais da categoria com os dados fornecidos pelo usuário
   * e envia apenas as diferenças para a API.
   *
   * @param {FieldValues} data - Os dados do formulário enviados pelo usuário.
   */
  const handleSubmit = (data: FieldValues) => {
    const differences = filterDifferences(category, data, [
      "snacks",
      "position_order",
      "category",
    ]);
    if (Object.keys(differences).length) {
      if ("description" in differences) {
        differences.update_description = differences.description;
        delete differences.description;
      }

      fetchData({
        request: {
          url: stockSnackEP.category(category.name),
          method: "PATCH",
          data: differences,
        },
        modalTitleWhenError: `Erro ao editar a categoria ${category.name}`,
        onSuccess: () => removeModal(),
      });
    } else {
      removeModal();
    }
  };

  return (
    <Modal
      formMode
      title={`Editar Categoria ${category.name}`}
      buttons={[
        { text: "Cancelar", onClick: () => removeModal() },
        {
          appearance: "principal",
          text: "Salvar",
          type: "submit",
          isLoading,
          formId,
        },
      ]}
    >
      <FormProvider {...form}>
        <Form
          id={formId}
          onSubmit={handleSubmit}
          outputData={[
            "name",
            { name: "description", format: ["title", "text"] },
          ]}
        >
          <TextField
            name="name"
            label="Nome"
            config={{
              initValue: category.name,
              writing: { capitalize: "all" },
            }}
            required
          />

          <p className="marker">Descrição da Categoria</p>
          <AreaField
            name="title"
            label="Título"
            config={{
              initValue: category.description?.title,
              valueRules: {
                includeNameCategory: (value) =>
                  value.includes(form.watch("name")) ||
                  "O título da descrição deve conter o nome da categoria.",
              },
            }}
            required
          />
          <AreaField
            name="text"
            label="Texto"
            config={{ initValue: category.description?.text }}
            required
          />
          <span className="marker"></span>
        </Form>
      </FormProvider>
      <Button
        text="Excluir Categoria"
        onClick={() =>
          addNewModal(<RemoveCategory categoryName={category.name} />)
        }
      />
    </Modal>
  );
};

export default EditCategory;
