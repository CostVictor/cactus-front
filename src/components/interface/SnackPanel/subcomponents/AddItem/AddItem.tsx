import Modal from "@/components/display/Modal";
import useModal from "@/hooks/context/useModal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import useAuth from "@/hooks/context/useAuth";

import { PropsSnack } from "../Snack";
import { errorExtractor } from "@/hooks/network/useRequest";

import { convertMoney } from "@/utils/formatters";
import { PropsAddItem } from "./additem.types";
import style from "./additem.module.scss";

const AddItem = ({ nameCategory, setSnacksList }: PropsAddItem) => {
  const {
    actions: { safeFeth },
  } = useAuth();

  const {
    actions: { addNewModal, removeModal },
  } = useModal();

  const includeItem = (name: string, price: string) => {
    const newItem: PropsSnack = {
      name,
      price,
      quantity_in_stock: 0,
      description: null,
      path_img: null,
    };
    setSnacksList((prevList) => [...prevList, newItem]);
  };

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
              <Form
                onSubmit={(data) => {
                  safeFeth(
                    {
                      url: `snacks/${nameCategory}`,
                      method: "POST",
                      content: {
                        ...data,
                        price: convertMoney(data.price, true),
                      },
                    },
                    () => {
                      includeItem(data.name, data.price);
                      removeModal(-1);
                    },
                    (err) =>
                      addNewModal(
                        <Modal
                          title="Erro ao criar"
                          message={errorExtractor(err)}
                        />
                      )
                  );
                }}
                includeButton={{
                  text: "Cancelar",
                  onClick: () => removeModal(-1),
                }}
                defaultButtonSubmitText="Criar"
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
              </Form>
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
