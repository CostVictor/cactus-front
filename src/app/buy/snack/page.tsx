"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

import useRequest from "@/hooks/network/useRequest";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";

import Cart from "@/components/layout/Cart";
import useCart from "@/hooks/context/useCart";

import { BaseCategory } from "@api/types/snack";
import { apiHTTP } from "@api/endpoints";

function BuyContent() {
  const { getCart, clearCart } = useCart.actions();
  const { snack } = apiHTTP;

  const {
    info: { data, isLoading },
    actions: { fetchData },
  } = useRequest<BaseCategory[]>({
    initFetchData: {
      request: { url: snack.baseUrl, method: "GET" },
      modalTitleWhenError: "Erro ao Carregar as Categorias",
    },
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const item = searchParams.get("item");

  const { addNewModal } = useModalActions();

  useEffect(() => {
    if (category && item && !isLoading) {
      addNewModal(<Modal title="Teste" />);
      router.replace(pathname);
    }
  }, [isLoading, router, pathname, addNewModal, category, item]);

  return (
    <>
      <Cart
        cartRef="cartSnack"
        stock={data ?? []}
        buttons={[
          {
            text: "Cancelar Compra",
            onClick: () => {
              clearCart("cartSnack");
              router.push("/");
            },
          },
          {
            text: "Prosseguir",
            appearance: "principal",
            onClick: () => console.log(getCart("cartSnack")),
          },
        ]}
      />
      <main>Main</main>
    </>
  );
}

export default function BuySnackPage() {
  return (
    <Suspense>
      <BuyContent />
    </Suspense>
  );
}
