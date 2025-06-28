import { PropsStorageCart, PropsStorageCartSubmit } from "./usecart.types";
import { create } from "zustand";

const StorageCart = create<PropsStorageCart>((set, get) => ({
  cartLunch: {
    lunch: null,
    snacks: null,
  },
  cartSnack: {
    lunch: null,
    snacks: null,
  },
  actions: {
    getTotalPrice: (ref) => {
      const { cartLunch, cartSnack } = get();
      const { lunch, snacks } = ref === "cartLunch" ? cartLunch : cartSnack;

      // Obtem o valor total referente a compra do almoço.
      const lunchPrice =
        (lunch?.items.reduce((total, item) => {
          const value =
            item.price === "--"
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
      const snackPrice = Object.values(snacks || {}).reduce(
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
    getQuantity: (ref) => {
      const { cartLunch, cartSnack } = get();
      const { lunch, snacks } = ref === "cartLunch" ? cartLunch : cartSnack;
      return (
        (lunch?.items.length || 0) +
        Object.values(snacks || {}).reduce((total, category) => {
          return total + category.items.length;
        }, 0)
      );
    },
    getCart: (ref) => {
      const { cartLunch, cartSnack } = get();
      const { lunch, snacks } = ref === "cartLunch" ? cartLunch : cartSnack;

      const cart = {
        lunch: [],
        snacks: {},
      } as PropsStorageCartSubmit;

      if (ref === "cartLunch") {
        for (let item of lunch?.items || []) {
          cart.lunch.push({ name: item.name, quantity: item.quantity });
        }
      }

      for (let obj of Object.entries(snacks || {})) {
        const [nameCategory, category] = obj;

        for (let item of category.items) {
          if (!cart.snacks.hasOwnProperty(nameCategory)) {
            cart.snacks[nameCategory] = [];
          }

          cart.snacks[nameCategory].push({
            name: item.name,
            quantity: item.quantity,
          });
        }
      }

      return cart;
    },
    setLunch: (name, price, quantity, choiceNumber, dishPrice) =>
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
            if (choiceNumber) {
              // Busca e remove o item com o mesmo choiceNumber.
              const checkItemWithChoiceNumber = lunchItems.find(
                (item) => item.choiceNumber === choiceNumber
              );

              if (!!checkItemWithChoiceNumber) {
                lunchItems = lunchItems.filter(
                  (item) => item !== checkItemWithChoiceNumber
                );
              }
            }

            lunchItems.push({ name, price, quantity, choiceNumber });
          }
        }

        return {
          ...storage,
          cartLunch: {
            ...storage.cartLunch,
            lunch: lunchItems.length
              ? { basePrice: dishPrice, items: lunchItems }
              : null,
          },
        };
      }),
    setSnack: (ref, category, name, price, quantity) =>
      set((storage) => {
        const snacks = storage[ref].snacks || {};
        var snackItems = snacks?.[category]?.items || [];

        if (quantity <= 0) {
          // Remove o item e verifica se a categoria ainda deve ser mantida.
          const newListItems = snackItems.filter((item) => item.name !== name);

          if (newListItems.length) {
            snacks[category].items = newListItems;
          } else {
            delete snacks[category];
          }
        } else {
          // Atualiza ou cria um novo item.
          const item = snackItems.find((item) => item.name === name);

          if (item) {
            item.quantity = quantity;
          } else {
            snackItems.push({ name, price, quantity });
          }
          snacks[category] = { ...snacks[category], items: snackItems };
        }

        return {
          ...storage,
          [ref]: {
            ...storage[ref],
            snacks: Object.keys(snacks) ? snacks : null,
          },
        };
      }),
    clearCart: (ref) =>
      set((storage) => ({
        ...storage,
        [ref]: {
          lunch: null,
          snacks: null,
        },
      })),
  },
}));

export default StorageCart;
