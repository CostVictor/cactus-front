"use client";

import {
  PropsModalContext,
  PropsAddNewModalFunction,
  PropsRemoveModalFunction,
} from "./usemodal.types";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";

const modalContext = createContext<undefined | PropsModalContext>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [listModal, setListModal] = useState<ReactNode[]>([]);

  /**
   * Adiciona um novo componente react na lista.
   */
  const addNewModal: PropsAddNewModalFunction = (modal) => {
    document.body.classList.add("blocked_scroll");
    setListModal((prevList) => {
      return [...prevList, modal];
    });
  };

  /**
   * Remove o item da lista na posição definida.
   * Index negativos também são aceitos para contagem a partir do final.
   */
  const removeModal: PropsRemoveModalFunction = (index) =>
    setListModal((prevList) => {
      const newList = [...prevList];
      const newIndex = index < 0 ? newList.length + index : index;

      newList.splice(newIndex, 1);
      if (!newList.length) {
        document.body.classList.remove("blocked_scroll");
      }
      return newList;
    });

  return (
    <modalContext.Provider value={{ addNewModal, removeModal }}>
      {children}
      <AnimatePresence>
        {listModal.length ? (
          <div className="block_shadow">{listModal[listModal.length - 1]}</div>
        ) : null}
      </AnimatePresence>
    </modalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(modalContext);
  if (context === undefined) {
    throw new Error("useModal deve estar dentro de ModalProvider.");
  }
  return context;
};

export default useModal;
