"use client";

import { useRouter } from "next/navigation";

import useRequest from "@/hooks/network/useRequest";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";

import Cart from "@/components/layout/Cart";

import { apiHTTP } from "@api/endpoints";

export default function BuyLunchPage() {
  const { lunch } = apiHTTP;
  const router = useRouter();

  const {
    info: { data, isLoading },
    actions: { fetchData },
  } = useRequest({
    config: { showErrorModal: false },
    initFetchData: {
      request: { url: lunch.today(true), method: "GET" },
      onError: () => router.push("/"),
    },
  });

  const { addNewModal } = useModalActions();

  return (
    <>
      <Cart
        title="Carrinho"
        buttons={[
          { text: "Cancelar Compra" },
          { text: "Concluir", appearance: "principal" },
        ]}
      />
      <main>Main</main>
    </>
  );
}
