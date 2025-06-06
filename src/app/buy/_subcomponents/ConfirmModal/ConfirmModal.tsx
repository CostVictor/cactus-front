import { useForm, FormProvider } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useState } from "react";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";
import useRequest from "@/hooks/network/useRequest";
import useCart from "@/hooks/context/useCart";
import useAuthState from "@/hooks/context/useAuth";

import Form from "@/components/form/Form";
import AreaField from "@/components/form/AreaField";

import Shop from "./subcomponents/Shop";
import { apiHTTP } from "@api/endpoints";
import { PropsConfirmModal } from "./confirmmodal.types";
import style from "./confirmmodal.module.scss";

const ConfirmModal = ({ cartRef }: PropsConfirmModal) => {
  const { order } = apiHTTP;

  const [isRead, setIsRead] = useState(false);
  const { addNewModal, removeModal } = useModalActions();
  const { getCart, getTotalPrice, clearCart } = useCart.actions();
  const { user } = useAuthState();

  const {
    info: { data, isLoading },
    actions: { fetchData },
  } = useRequest();

  const formId = "form-confirm-modal";
  const form = useForm();

  return (
    <Modal
      title="Confirmar Pedido"
      buttons={[
        {
          text: "Voltar",
          onClick: () => removeModal(),
        },
        {
          text:
            user?.role === "client" ? "Adicionar à ficha" : "Registrar compra",
          appearance: "principal",
          type: "submit",
          isLoading,
          formId,
        },
      ]}
      formMode
    >
      <span className={style.warning}>
        <Icon icon="material-symbols:warning-rounded" className={style.icon} />
        <p>Por favor, verifique se os dados abaixo estão corretos.</p>
      </span>

      <p className="marker">Informações do pedido</p>
      <Shop cartRef={cartRef} />

      <div className={style.total_value}>
        <span>Preço total:</span>
        <p>{getTotalPrice(cartRef)}</p>
      </div>

      <FormProvider {...form}>
        <Form
          id={formId}
          className={style.container_form}
          onSubmit={(dataForm) => {
            const dataOrder = getCart(cartRef);
            dataOrder.description = dataForm.description;

            fetchData({
              request: {
                url: order.baseUrl,
                method: "POST",
                data: dataOrder,
              },
              modalTitleWhenError: "Erro ao Efetuar o Pedido",
              onSuccess: () => {
                clearCart(cartRef);
                removeModal();
                addNewModal(
                  <Modal
                    title="Pedido Efetuado"
                    buttons={[
                      {
                        text: "Voltar para a Home",
                        appearance: "principal",
                        onClick: () => (window.location.href = "/"),
                      },
                    ]}
                    message={
                      user?.role === "client"
                        ? [
                            "Pedido efetuado com sucesso.",
                            "Para acessar as informações do pedido, acesse sua ficha.",
                            "Agradecemos pela compra!!",
                          ]
                        : "O pedido foi processado e registrado com sucesso."
                    }
                  />
                );
              },
            });
          }}
        >
          <p className="marker">
            Deixe um comentário sobre como deseja o pedido (Opcional)
          </p>
          <AreaField label="Comentário" name="description" />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default ConfirmModal;
