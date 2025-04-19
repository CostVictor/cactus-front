import { persist } from "zustand/middleware";
import { create } from "zustand";

import { PropsStorageCart } from "./usecart.types";

const StorageCart = create<PropsStorageCart>()(
  persist(
    (set) => ({
      items: null,
      state: {
        isOpen: false,
        toggleIsOpen: () =>
          set((storage) => ({
            ...storage,
            state: { ...storage.state, isOpen: !storage.state.isOpen },
          })),
      },
      actions: {
        editCart: (category, name, quantity) =>
          set((storage) => {
            const cart = storage.items || {};
            const listItems = cart[category] || [];

            if (quantity <= 0) {
              // Remove o item e verifica se a categoria ainda deve ser mantida.
              const newListItems = listItems.filter(
                (item) => item.name !== name
              );

              if (newListItems.length) {
                cart[category] = newListItems;
              } else {
                delete cart[category];
              }
            } else {
              // Atualiza ou cria um novo item.
              const item = listItems.find((item) => item.name === name);

              if (item) {
                item.quantity = quantity;
              } else {
                listItems.push({ name, quantity });
              }
              cart[category] = listItems;
            }

            return { ...storage, items: cart };
          }),
        clearCart: () => set((storage) => ({ ...storage, items: null })),
      },
    }),
    {
      name: "cart",
      partialize: (storage) => storage.items,
    }
  )
);

export default StorageCart;
