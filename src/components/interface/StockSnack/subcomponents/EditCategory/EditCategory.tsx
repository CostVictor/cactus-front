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
import { EditCategoryProps } from "./editcategory.types";
import { apiHTTP } from "@api/endpoints";
import style from "./editcategory.module.scss";

const EditCategory = ({ category }: EditCategoryProps) => {
  const { addNewModal, removeModal } = useModalActions();
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const { snack } = apiHTTP;
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
      fetchData({
        request: {
          url: snack.category(category.name),
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
          className={style.form_edit_category}
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
              expandTo: "75px",
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
