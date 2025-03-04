import useModalActions from "@/hooks/context/useModal";
import useRequest from "@/hooks/network/useRequest";

import Modal from "@/components/display/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";

import { stockSnacksEP } from "@APISCMapping/endpoints";
import style from "./addcategory.module.scss";

const AddCategory = () => {
  const { addNewModal, removeModal } = useModalActions();
  const {
    actions: { fetchData },
  } = useRequest<null>();

  return (
    <div
      className={style.container}
      onClick={() =>
        addNewModal(
          <Modal title="Criar Categoria" buttons={null}>
            <div style={{ marginBottom: 5 }}>
              <Form
                onSubmit={(data) =>
                  fetchData({
                    request: {
                      url: stockSnacksEP.base,
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
