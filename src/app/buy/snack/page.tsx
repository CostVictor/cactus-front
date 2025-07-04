"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

import useRequest from "@/hooks/network/useRequest";

import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import Section from "../_subcomponents/Section";
import SnackPanel from "../_subcomponents/SnackPanel";
import BuyModal from "../_subcomponents/SnackPanel/subcomponents/BuyModal";
import ConfirmModal from "../_subcomponents/ConfirmModal";

import Cart from "../_subcomponents/Cart";
import useCart from "@/hooks/context/useCart";

import { BaseCategory } from "@api/types/snack";
import { apiHTTP } from "@api/endpoints";

function BuyContent() {
  const { clearCart, getQuantity } = useCart.actions();
  const { snack } = apiHTTP;

  const {
    info: { data, isLoading },
  } = useRequest<BaseCategory[]>({
    initFetchData: {
      request: { url: snack.baseUrl, method: "GET" },
      modalTitleWhenError: "Erro ao Carregar as Categorias",
    },
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryName = searchParams.get("category");
  const itemName = searchParams.get("item");

  const { addNewModal } = useModalActions();

  useEffect(() => {
    if (categoryName && itemName && !isLoading && Array.isArray(data)) {
      const snack = data
        .find((category) => category.name === categoryName)
        ?.snacks.find((snack) => snack.name === itemName);

      if (snack) {
        addNewModal(
          <BuyModal
            cartRef="cartSnack"
            categoryName={categoryName}
            snack={snack}
          />
        );
      }

      router.replace(pathname);
    }
  }, [categoryName, itemName, isLoading, data, pathname, router, addNewModal]);

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
            onClick: () => {
              if (getQuantity("cartSnack")) {
                addNewModal(<ConfirmModal cartRef="cartSnack" />);
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
        <Section>
          {Array.isArray(data) && (
            <SnackPanel products={data} cartRef="cartSnack" />
          )}
        </Section>
      </main>
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
