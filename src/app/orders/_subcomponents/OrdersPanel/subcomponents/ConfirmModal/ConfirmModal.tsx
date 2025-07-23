"use client";

import { useForm, FormProvider } from "react-hook-form";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";

import Form from "@/components/form/Form";
import OptionsField from "@/components/form/OptionsField";

import useRequest from "@/hooks/network/useRequest";
import { http } from "@api/endpoints";

import { PropsConfirmModal } from "./confirmmodal.types";
import style from "./confirmmodal.module.scss";

const ConfirmModal = ({ orderId, isPaid }: PropsConfirmModal) => {
  const { removeModal } = useModalActions();
  const { order } = http;

  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const formId = "confirm-order-form";
  const form = useForm();

  return (
    <Modal
      title="Confirmar Atendimento"
      buttons={[
        { text: "Voltar", onClick: () => removeModal() },
        {
          text: "Confirmar",
          appearance: "principal",
          onClick: isPaid
            ? () =>
                fetchData({
                  request: {
                    url: order.recordAsFulfilled(orderId),
                    method: "POST",
                  },
                  onSuccess: () => removeModal(),
                })
            : undefined,
          formId,
          isLoading,
        },
      ]}
      formMode
    >
      <p className={style.text}>
        Ao confirmar o atendimento deste pedido, ele será contabilizado nas
        estatísticas de venda.
      </p>

      {!isPaid && (
        <FormProvider {...form}>
          <Form
            id={formId}
            onSubmit={(data) => {
              const orderStatus = data.orderStatus as "Paid" | "Fulfilled";
              const url = order[`recordAs${orderStatus}`](orderId);

              fetchData({
                request: { url, method: "POST" },
                onSuccess: () => removeModal(),
              });
            }}
          >
            <OptionsField
              type="radio"
              name="orderStatus"
              label="O pedido já foi pago?"
              options={[
                { name: "Sim", value: "Paid" },
                { name: "Não", value: "Fulfilled" },
              ]}
              required
            />
          </Form>
        </FormProvider>
      )}
    </Modal>
  );
};

export default ConfirmModal;
