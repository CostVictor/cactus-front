import { Icon } from "@iconify/react";
import { useState } from "react";
import clsx from "clsx";

import Button from "@/components/form/Button";
import CartCategory from "./subcomponents/CartCategory";
import CartItem from "./subcomponents/CartItem";

import useCart from "@/hooks/context/useCart";

import { PropsCart } from "./cart.types";
import style from "./cart.module.scss";

const Cart = ({ cartRef, stock, buttons }: PropsCart) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartLunch, cartSnack, actions } = useCart;

  const { setSnack, getTotalPrice, getQuantity } = actions();
  const { lunch, snacks } = cartRef === "cartLunch" ? cartLunch() : cartSnack();

  const stockIsArray = Array.isArray(stock);
  const lengthCategories = Object.keys(snacks ?? {}).length;

  const applyCategory =
    lengthCategories > 1 || (!stockIsArray && !!lunch && lengthCategories > 0);

  return (
    <section className={clsx(style.container_main, { [style.open]: isOpen })}>
      <div className={style.container_menu}>
        <div className={style.icon_cart}>
          {!isOpen && ((!!lunch && !stockIsArray) || !!snacks) && (
            <p>{getQuantity(cartRef)}</p>
          )}
          <Icon icon="material-symbols:shopping-cart-rounded" />
        </div>
        <h2>Carrinho</h2>
        <Icon
          className={style.icon_action}
          onClick={() => setIsOpen((prev) => !prev)}
          xlinkTitle={isOpen ? "Abrir" : "Fechar"}
          icon={
            isOpen
              ? "ci:close-sm"
              : "material-symbols:keyboard-arrow-up-rounded"
          }
        />
      </div>

      <div className={style.cart}>
        {!!lunch && (
          <CartCategory basePrice={lunch.basePrice || undefined} title="Almoço">
            {lunch.items.map((item, index) => (
              <CartItem
                key={index}
                cartRef="cartLunch"
                category="Almoço"
                maxQuantity={item.price === "--" ? 1 : 100}
                borderDashed
                {...item}
                price={
                  item.price !== "--"
                    ? item.quantity > 1
                      ? item.price
                      : "R$ 0,00"
                    : item.price
                }
                dishPrice={lunch.basePrice || ""}
              />
            ))}
          </CartCategory>
        )}

        {Object.entries(snacks ?? {}).map(([nameCategory, category], index) => {
          const listRef = stockIsArray ? stock : stock.products;
          const items = category.items.map((item) => {
            const itemStockRef = listRef
              .find((category) => category.name === nameCategory)
              ?.snacks.find((snack) => snack.name === item.name);

            if (!!itemStockRef) {
              if (
                itemStockRef.quantity_in_stock < item.quantity ||
                itemStockRef.price !== item.price
              ) {
                setSnack(
                  cartRef,
                  nameCategory,
                  item.name,
                  itemStockRef.price,
                  itemStockRef.quantity_in_stock
                );
              }

              return (
                <CartItem
                  key={item.name}
                  cartRef={cartRef}
                  category={nameCategory}
                  maxQuantity={itemStockRef.quantity_in_stock}
                  borderDashed={applyCategory}
                  {...item}
                />
              );
            } else {
              setSnack(cartRef, nameCategory, item.name, item.price, 0);
            }
          });

          if (applyCategory) {
            return (
              <CartCategory key={index} title={nameCategory}>
                {items}
              </CartCategory>
            );
          }

          return items;
        })}
      </div>

      <span className={style.span_total_area}>
        <p className={style.text}>Total:</p>
        <p className={style.price}>{getTotalPrice(cartRef)}</p>
      </span>

      <div className={style.container_actions}>
        {buttons?.map((button, index) => (
          <Button key={index} {...button} />
        ))}
      </div>
    </section>
  );
};

export default Cart;
