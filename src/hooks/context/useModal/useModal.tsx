"use client";

import { AnimatePresence, motion } from "framer-motion";
import ReactDOMServer from "react-dom/server";
import { create } from "zustand";

import { PropsUseModal } from "./usemodal.types";

const useModal = create<PropsUseModal>((set) => ({
  state: { listModal: [] },
  actions: {
    addNewModal: (modal) => {
      set((storage) => {
        const renderedModal = ReactDOMServer.renderToString(modal);
        if (
          storage.state.listModal.some(
            (item) => ReactDOMServer.renderToString(item) === renderedModal
          )
        ) {
          return storage;
        }

        document.body.classList.add("blocked_scroll");
        if (document.activeElement instanceof HTMLElement) {
          // Retira o foco do input (Caso possua).
          document.activeElement.blur();
        }

        return { state: { listModal: [...storage.state.listModal, modal] } };
      });
    },
    removeModal: () =>
      set((storage) => {
        const newList = storage.state.listModal;
        newList.splice(newList.length - 1, 1);

        if (!newList.length) {
          document.body.classList.remove("blocked_scroll");
        }

        return { state: { listModal: newList } };
      }),
  },
}));

const useModalActions = () => useModal((storage) => storage.actions);
export const useModalState = () => useModal((storage) => storage.state);

export const ModalManager = () => {
  const { listModal } = useModalState();

  return (
    <AnimatePresence>
      {!!listModal.length && (
        <motion.div
          className="block_shadow"
          animate={{
            backdropFilter: "blur(3px)",
            backgroundColor: "var(--bg-shadow)",
          }}
          exit={{
            backdropFilter: "blur(0px)",
            transition: { duration: 0.1 },
          }}
        >
          {listModal[listModal.length - 1]}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default useModalActions;
