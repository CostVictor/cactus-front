"use client";

import { useRouter } from "next/navigation";
import useRequest from "@/hooks/network/useRequest";

import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import Section from "../_subcomponents/Section";
import LunchPanel from "../_subcomponents/LunchPanel";
import ConfirmModal from "../_subcomponents/ConfirmModal";

import Cart from "../_subcomponents/Cart";
import useCart from "@/hooks/context/useCart";

import { TodayLunchWithProducts } from "@api/types/lunch";
import { apiHTTP } from "@api/endpoints";

const BuyLunchPage = () => {
  const { clearCart, getQuantity } = useCart.actions();
  const { lunch } = apiHTTP;

  const router = useRouter();
  const { addNewModal, removeModal } = useModalActions();

  const {
    info: { data },
  } = useRequest<TodayLunchWithProducts>({
    config: { showErrorModal: false },
    initFetchData: {
      request: { url: lunch.today(true), method: "GET" },
      onError: (err) => {
        if (err.status === 404) {
          addNewModal(
            <Modal
              title="Almoço Indisponível"
              message="Não é possível comprar almoço nos finais de semana."
              buttons={[
                {
                  text: "Voltar para a Home",
                  appearance: "principal",
                  onClick: () => {
                    removeModal();
                    router.push("/");
                  },
                },
              ]}
            />
          );
        } else {
          addNewModal(
            <Modal
              title="Erro ao Carregar os Dados"
              message="Ocorreu um erro ao carregar o almoço."
              buttons={[
                {
                  text: "Voltar para a Home",
                  onClick: () => {
                    removeModal();
                    router.push("/");
                  },
                },
                {
                  text: "Recarregar a Página",
                  appearance: "principal",
                  onClick: () => {
                    removeModal();
                    router.refresh();
                  },
                },
              ]}
            />
          );
        }
      },
    },
  });

  return (
    <>
      <Cart
        cartRef="cartLunch"
        stock={data ?? []}
        buttons={[
          {
            text: "Cancelar Compra",
            onClick: () => {
              clearCart("cartLunch");
              router.push("/");
            },
          },
          {
            text: "Prosseguir",
            appearance: "principal",
            onClick: () => {
              if (getQuantity("cartLunch")) {
                addNewModal(<ConfirmModal cartRef="cartLunch" />);
                return;
              }

              addNewModal(
                <Modal
                  title="Carrinho Vazio"
                  message="O carrinho não possui nenhum item"
                />
              );
            },
          },
        ]}
      />
      <main>
        <Section>{!!data && <LunchPanel {...data} />}</Section>
      </main>
    </>
  );
};

export default BuyLunchPage;
