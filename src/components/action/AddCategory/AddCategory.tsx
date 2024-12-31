import useModalActions from "@/hooks/context/useModal";

import Modal from "@/components/display/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import style from "./addcategory.module.scss";

const AddCategory = () => {
  const { addNewModal, removeModal } = useModalActions();

  return (
    <div
      className={style.container}
      onClick={() =>
        addNewModal(
          <Modal title="Criar Categoria" buttons={null}>
            <Form
              onSubmit={(data) => console.log(data)}
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
          </Modal>
        )
      }
    >
      <p>Adicionar nova categoria</p>
    </div>
  );
};

export default AddCategory;
