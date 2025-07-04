import { useForm, FormProvider } from "react-hook-form";

import useCart from "@/hooks/context/useCart";
import Form from "@/components/form/Form";
import TextField from "@/components/form/TextField";
import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";

import { PropsBuyModal } from "./buymodal.types";
import style from "./buymodal.module.scss";

const BuyModal = ({ dishPrice, ingredient, choiceNumber }: PropsBuyModal) => {
  const { setLunch } = useCart.actions();
  const { removeModal } = useModalActions();

  const formId = "form-lunch-buy-modal";
  const form = useForm();

  return (
    <Modal
      title="Adicionar ao Carrinho"
      buttons={[
        { text: "Cancelar", type: "button", onClick: () => removeModal() },
        { text: "Adicionar", type: "submit", appearance: "principal", formId },
      ]}
      formMode
    >
      <span className={style.container_data}>
        <p>Nome do ingrediente:</p>
        <h3>{ingredient.name}</h3>
      </span>

      <span className={style.container_data}>
        <p>Valor por acréscimo:</p>
        <p className={style.value}>{ingredient.additional_charge}</p>
      </span>

      <span className={style.container_data}>
        <p>Como calculamos:</p>
        <p className={style.value}>
          {ingredient.additional_charge} x (quantidade - 1)
        </p>
      </span>

      <p className="marker">Definição de quantidade</p>

      <FormProvider {...form}>
        <Form
          id={formId}
          onSubmit={(data) => {
            const quantity = Number(data.quantity);

            removeModal();
            setLunch(
              ingredient.name,
              ingredient.additional_charge ?? "--",
              quantity,
              choiceNumber,
              dishPrice
            );
          }}
        >
          <TextField
            name="quantity"
            label="Quantidade"
            type="number"
            config={{
              initValue: "1",
              valueRules: {
                custom: {
                  quantity: (value) =>
                    Number(value) > 0 ||
                    "Você deve adicionar pelo menos uma unidade.",
                },
              },
            }}
            required
          />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default BuyModal;
