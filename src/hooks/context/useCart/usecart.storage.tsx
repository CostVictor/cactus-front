import { create } from "zustand";
import { PropsStorageCart } from "./usecart.types";

const StorageCart = create<PropsStorageCart>((set, get) => ({
  cartLunch: {
    lunch: null,
    snack: null,
  },
  cartSnack: {
    lunch: null,
    snack: null,
  },
  actions: {
    getTotalPrice: (ref) => {
      const { cartLunch, cartSnack } = get();
      const { lunch, snack } = ref === "cartLunch" ? cartLunch : cartSnack;

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
        const lunch = storage.cartLunch.lunch;
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
          ...storage,
          cartLunch: {
            ...storage.cartLunch,
            lunch: lunchItems.length
              ? { basePrice: lunch?.basePrice || null, items: lunchItems }
              : null,
          },
        };
      }),
    setSnack: (ref, category, name, price, quantity) =>
      set((storage) => {
        const snack = storage[ref].snack || {};
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
          ...storage,
          [ref]: {
            ...storage[ref],
            snack: Object.keys(snack) ? snack : null,
          },
        };
      }),
    clearCart: (ref) =>
      set((storage) => ({
        ...storage,
        [ref]: {
          lunch: null,
          snack: null,
        },
      })),
  },
}));

export default StorageCart;
