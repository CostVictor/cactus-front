import { Icon } from "@iconify/react";
import { useState } from "react";
import clsx from "clsx";

import useAuthState from "@/hooks/context/useAuth";
import Button from "@/components/form/Button";

import CartCategory from "./subcomponents/CartCategory";
import CartItem from "./subcomponents/CartItem";

import useCart from "@/hooks/context/useCart";

import { PropsCart } from "./cart.types";
import style from "./cart.module.scss";
import { console } from "inspector";

const Cart = ({ cartRef, stock, buttons }: PropsCart) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthState();

  const stockIsArray = Array.isArray(stock);
  const applyCategory = stockIsArray && stock.length > 1;

  const { cartLunch, cartSnack, actions } = useCart;

  const { setLunch, setSnack, getTotalPrice } = actions();
  const { lunch, snack } = cartRef === "cartLunch" ? cartLunch() : cartSnack();

  return (
    <section className={clsx(style.container_main, { [style.open]: isOpen })}>
      <div className={style.container_menu}>
        <div className={style.icon_cart}>
          {!isOpen && ((!!lunch && !stockIsArray) || !!snack) && <p>5</p>}
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

      {user?.role === "employee" && (
        <span className={style.span_select_user}>
          <div>
            <p>Registrar compra para:</p>
            <p className={style.text_user}>Func. Victor Gabriel</p>
          </div>
          <Icon icon="majesticons:pencil-alt-line" />
        </span>
      )}

      <div className={style.cart}>
        {!stockIsArray && <p>Lunch</p>}
        {}
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
