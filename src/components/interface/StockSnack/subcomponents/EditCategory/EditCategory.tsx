import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import Button from "@/components/forms/Button";

import { FieldValues } from "react-hook-form";
import { filterDifferences } from "@/utils/filters";
import { stockSnackEP } from "@APISCMapping/endpoints";
import { BaseCategory } from "@APISCMapping/snacks.types";

const EditCategory = ({ category }: { category: BaseCategory }) => {
  const { addNewModal, removeModal } = useModalActions();
  const {
    actions: { fetchData },
  } = useRequest<null>(undefined, {
    standardDisplayError: `Erro ao editar a categoria ${category.name}`,
    forceLoadingRequest: false,
  });

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
        onSuccess: () => removeModal(-1),
      });
    } else {
      removeModal(-1);
    }
  };

  return (
    <Modal
      title={`Editar Categoria ${category.name}`}
      buttons={null}
      notOverflow
    >
      <div style={{ marginBottom: 5 }}>
        <Form
          onSubmit={handleSubmit}
          includeButton={{ text: "Cancelar", onClick: () => removeModal(-1) }}
          defaultButtonSubmitText="Salvar"
          formatData={[
            "name",
            { name: "description", format: ["title", "text"] },
          ]}
        >
          <InputField
            name="name"
            label="Nome"
            value={category.name}
            config={{ validation: { capitalize: "all" } }}
            required
          />

          <p className="marker">Descrição da Categoria</p>
          <InputField
            name="title"
            label="Título"
            value={category.description?.title}
            config={{
              validation: {
                custom: {
                  includeNameCategory: (value) =>
                    value.includes(category.name) ||
                    `O título da descrição da categoria deve possuir o nome "${category.name}".`,
                },
              },
            }}
            required
          />
          <InputField
            name="text"
            label="Texto"
            value={category.description?.text}
            required
          />

          <p className="marker"></p>
          <Button
            text="Excluir Categoria"
            type="button"
            onClick={() =>
              addNewModal(
                <Modal
                  title="Confirmar Exclusão"
                  message={`Ao excluir a categoria "${category.name}", todos os itens relacionados a ela também serão excluídos.`}
                  buttons={[
                    { text: "Voltar", onClick: () => removeModal(-1) },
                    {
                      text: "Excluir",
                      appearance: "main",
                      onClick: () =>
                        fetchData({
                          request: {
                            url: stockSnackEP.category(category.name),
                            method: "DELETE",
                          },
                          onSuccess: () => {
                            removeModal(-2);
                            removeModal(-1);
                          },
                        }),
                    },
                  ]}
                />
              )
            }
            noShadow
          />
        </Form>
      </div>
    </Modal>
  );
};

export default EditCategory;
