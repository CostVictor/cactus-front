import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";
import Form from "@/components/forms/Form";
import useRequest from "@/hooks/network/useRequest";

import { stockSnackEP } from "@APISCMapping/endpoints";
import { PropsAddItem } from "./additem.types";
import style from "./additem.module.scss";

const AddItem = ({ nameCategory }: PropsAddItem) => {
  const { addNewModal, removeModal } = useModalActions();
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>(undefined, {
    standardDisplayError: `Erro ao criar um item em ${nameCategory}`,
  });

  return (
    <article
      className={style.create_snack}
      onClick={() =>
        addNewModal(
          <Modal
            title={`Criar Item em ${nameCategory}`}
            buttons={null}
            notOverflow
          >
            <div style={{ marginBottom: 5 }}>
              {/* <Form
                onSubmit={(data) =>
                  fetchData({
                    request: {
                      url: stockSnackEP.category(nameCategory),
                      method: "POST",
                      data,
                    },
                    onSuccess: () => removeModal(-1),
                  })
                }
                includeButton={{
                  text: "Cancelar",
                  onClick: () => removeModal(-1),
                }}
                defaultButtonSubmitText="Criar"
                isLoading={isLoading}
              >
                <InputField
                  name="name"
                  label="Nome do item"
                  config={{ validation: { capitalize: "all" } }}
                  required
                />
                <InputField
                  name="price"
                  label="Preço"
                  config={{ type: "price" }}
                  required
                />
              </Form> */}
            </div>
          </Modal>
        )
      }
    >
      <p>Adicionar item</p>
    </article>
  );
};

export default AddItem;
