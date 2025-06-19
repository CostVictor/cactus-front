import { useForm, FormProvider } from "react-hook-form";

import useCart from "@/hooks/context/useCart";

import Form from "@/components/form/Form";
import TextField from "@/components/form/TextField";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";

import { PropsBuySnackModal } from "./buysnackmodal.types";
import style from "./buysnackmodal.module.scss";

const BuySnackModal = ({
  cartRef,
  categoryName,
  snack,
}: PropsBuySnackModal) => {
  const { removeModal } = useModalActions();
  const { setSnack } = useCart.actions();

  const formId = "form-buy-modal";
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
      <div className={style.container_data}>
        <span>Nome do produto:</span>
        <h3>{snack.name}</h3>
      </div>

      <div className={style.container_data}>
        <span>Preço da unidade:</span>
        <p>{snack.price}</p>
      </div>

      <div className={style.container_data}>
        <span>Disponível no estoque:</span>
        <p>{snack.quantity_in_stock}</p>
      </div>

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

export default BuySnackModal;
