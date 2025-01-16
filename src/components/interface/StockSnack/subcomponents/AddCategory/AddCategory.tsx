"use client";

import useModalActions from "@/hooks/context/useModal";
import useRequest from "@/hooks/network/useRequest";

import Modal from "@/components/display/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";

import { stockSnackEP } from "@APISCMapping/endpoints";
import style from "./addcategory.module.scss";

const AddCategory = () => {
  const { addNewModal, removeModal } = useModalActions();
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>(undefined, {
    standardDisplayError: "Erro ao criar a categoria",
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
                  fetchData({
                    request: {
                      url: stockSnackEP.base,
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
