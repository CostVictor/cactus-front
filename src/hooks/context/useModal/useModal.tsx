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
        return { state: { listModal: [...storage.state.listModal, modal] } };
      });
    },
    removeModal: (index) =>
      set((storage) => {
        const newList = storage.state.listModal;
        const newIndex = index < 0 ? newList.length + index : index;

        newList.splice(newIndex, 1);
        if (!newList.length) {
          document.body.classList.remove("blocked_scroll");
        }

        return { state: { listModal: newList } };
      }),
  },
}));

export const ModalManager = () => {
  const {
    state: { listModal },
  } = useModal();

  return (
    <AnimatePresence>
      {listModal.length ? (
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
      ) : null}
    </AnimatePresence>
  );
};

export default useModal;
