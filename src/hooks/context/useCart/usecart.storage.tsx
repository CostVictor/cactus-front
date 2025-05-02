import { create } from "zustand";
import { PropsStorageCart } from "./usecart.types";

const StorageCart = create<PropsStorageCart>((set, get) => ({
  state: {
    lunch: null,
    snack: null,
  },
  actions: {
    getTotalPrice: () => {
      const { lunch, snack } = get().state;

      // Obtem o valor total referente a compra do almoço.
      const lunchPrice =
        (lunch?.items.reduce((total, item) => {
          const value = !item.price
            ? 0
            : parseFloat(
                item.price.replace("R$", "").replace(",", ".").trim()
              ) || 0;

          // Calcula o valor do acrescimo para o ingrediente (desconsiderando a primeira unidade).
          if (value > 0 && item.quantity > 1) {
            return total + value * (item.quantity - 1);
          }
          return total;
        }, 0) || 0) +
        parseFloat(
          lunch?.basePrice?.replace("R$", "").replace(",", ".").trim() || "0"
        );

      // Obtem o valor total referente a compra dos lanches.
      const snackPrice = Object.values(snack || {}).reduce(
        (total, category) => {
          return (
            total +
            category.items.reduce((total, item) => {
              const value = !item.price
                ? 0
                : parseFloat(
                    item.price.replace("R$", "").replace(",", ".").trim()
                  ) || 0;

              return total + value * item.quantity;
            }, 0)
          );
        },
        0
      );

      return `R$ ${(lunchPrice + snackPrice).toFixed(2)}`.replace(".", ",");
    },
    setLunch: (name, price, quantity) =>
      set((storage) => {
        const lunch = storage.state.lunch;
        var lunchItems = lunch?.items || [];

        if (quantity <= 0) {
          // Remove o item.
          lunchItems = lunchItems.filter((item) => item.name !== name);
        } else {
          // Atualiza ou cria um novo item.
          const item = lunchItems.find((item) => item.name === name);

          if (item) {
            item.quantity = quantity;
          } else {
            lunchItems.push({ name, price, quantity });
          }
        }

        return {
          state: {
            ...storage.state,
            lunch: lunchItems.length
              ? { basePrice: lunch?.basePrice || null, items: lunchItems }
              : null,
          },
        };
      }),
    setSnack: (category, name, price, quantity) =>
      set((storage) => {
        const snack = storage.state.snack || {};
        var snackItems = snack?.[category]?.items || [];

        if (quantity <= 0) {
          // Remove o item e verifica se a categoria ainda deve ser mantida.
          const newListItems = snackItems.filter((item) => item.name !== name);

          if (newListItems.length) {
            snack[category].items = newListItems;
          } else {
            delete snack[category];
          }
        } else {
          // Atualiza ou cria um novo item.
          const item = snackItems.find((item) => item.name === name);

          if (item) {
            item.quantity = quantity;
          } else {
            snackItems.push({ name, price, quantity });
          }
          snack[category] = { ...snack[category], items: snackItems };
        }

        return {
          state: {
            ...storage.state,
            snack: Object.keys(snack) ? snack : null,
          },
        };
      }),
    clearCart: () => set(() => ({ state: { lunch: null, snack: null } })),
  },
}));

export default StorageCart;
