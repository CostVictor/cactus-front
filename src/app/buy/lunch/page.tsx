"use client";

import { useRouter } from "next/navigation";
import useRequest from "@/hooks/network/useRequest";

import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import BuySection from "../_subcomponents/BuySection";
import BuyPanel from "../_subcomponents/BuyPanel";
import ConfirmModal from "../_subcomponents/ConfirmModal";

import Cart from "../_subcomponents/Cart";
import useCart from "@/hooks/context/useCart";

import { TodayLunchWithProducts } from "@api/types/lunch";
import { apiHTTP } from "@api/endpoints";

const BuySnackPage = () => {
  const { clearCart, getQuantity } = useCart.actions();
  const { lunch } = apiHTTP;

  const {
    info: { data },
  } = useRequest<TodayLunchWithProducts>({
    initFetchData: {
      request: { url: lunch.today(true), method: "GET" },
      modalTitleWhenError: "Erro ao Carregar os Dados",
    },
  });

  const router = useRouter();
  const { addNewModal } = useModalActions();

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
        <BuySection>{!!data && <BuyPanel {...data} />}</BuySection>
      </main>
    </>
  );
};

export default BuySnackPage;
