import useModal from "@/hooks/context/useModal";

import Modal from "@/components/display/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import useRequest, { errorExtractor } from "@/hooks/network/useRequest";

import { PropsCategory } from "@/app/stock/snacks/snacks.types";
import { PropsAddCategory } from "./addcategory.types";
import style from "./addcategory.module.scss";

const AddCategory = ({ setData }: PropsAddCategory) => {
  const {
    actions: { addNewModal, removeModal },
  } = useModal();

  const {
    actions: { fethData },
  } = useRequest(); 

  /**
   * Adiciona uma nova categoria na exibição da tela.
   * @param {string} name - Nome da nova categoria.
   * @returns {void}
   */
  const includeCategory = (name: string): void =>
    setData((prevValue) => {
      const newCategory: PropsCategory = {
        name,
        position_order: prevValue ? prevValue.length + 1 : 1,
        path_img: null,
        snacks: [],
      };

      if (prevValue?.length) {
        return [...prevValue, newCategory];
      }
      return [newCategory];
    });

  return (
    <div
      className={style.container}
      onClick={() =>
        addNewModal(
          <Modal title="Criar Categoria" buttons={null}>
            <div style={{ marginBottom: 5 }}>
              <Form
                onSubmit={(data) =>
                  fethData(
                    { url: "snacks/", method: "POST", content: data },
                    () => {
                      includeCategory(data.name);
                      removeModal(-1);
                    },
                    (err) =>
                      addNewModal(
                        <Modal
                          title="Erro ao Criar"
                          message={errorExtractor(err)}
                        />
                      )
                  )
                }
                includeButton={{
                  text: "Cancelar",
                  onClick: () => removeModal(-1),
                }}
                defaultButtonSubmitText="Criar"
              >
                <InputField
                  name="name"
                  label="Nome da Categoria"
                  config={{
                    validation: {
                      capitalize: "all",
                    },
                  }}
                  required
                />
              </Form>
            </div>
          </Modal>
        )
      }
    >
      <p>Adicionar nova categoria</p>
    </div>
  );
};

export default AddCategory;
