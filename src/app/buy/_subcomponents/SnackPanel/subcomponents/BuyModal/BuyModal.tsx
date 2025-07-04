import { useForm, FormProvider } from "react-hook-form";

import useCart from "@/hooks/context/useCart";

import Form from "@/components/form/Form";
import TextField from "@/components/form/TextField";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";

import { PropsBuyModal } from "./buymodal.types";
import style from "./buymodal.module.scss";

const BuyModal = ({ cartRef, categoryName, snack }: PropsBuyModal) => {
  const { removeModal } = useModalActions();
  const { setSnack } = useCart.actions();

  const formId = "form-snack-buy-modal";
  const form = useForm();

  return (
    <Modal
      title="Adicionar ao Carrinho"
      buttons={[
        { text: "Cancelar", onClick: () => removeModal() },
        { text: "Adicionar", type: "submit", appearance: "principal", formId },
      ]}
      formMode
    >
      <span className={style.container_data}>
        <p>Nome do produto:</p>
        <h3>{snack.name}</h3>
      </span>

      <span className={style.container_data}>
        <p>Preço da unidade:</p>
        <p className={style.value}>{snack.price}</p>
      </span>

      <span className={style.container_data}>
        <p>Disponível no estoque:</p>
        <p className={style.value}>{snack.quantity_in_stock}</p>
      </span>

      <p className="marker">Seleção de Quantidade</p>

      <FormProvider {...form}>
        <Form
          id={formId}
          onSubmit={(data) => {
            const quantity = Number(data.quantity);

            removeModal();
            setSnack(cartRef, categoryName, snack.name, snack.price, quantity);
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
                  quantity: (value) => {
                    const quantity = Number(value);

                    if (quantity <= 0) {
                      return "Você deve adicionar pelo menos uma unidade.";
                    }

                    if (quantity > snack.quantity_in_stock) {
                      return "Quantidade indisponível no estoque.";
                    }

                    return true;
                  },
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
