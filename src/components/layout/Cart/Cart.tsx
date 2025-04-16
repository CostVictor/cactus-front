import { Icon } from "@iconify/react";

import useAuthState from "@/hooks/context/useAuth";
import Button from "@/components/form/Button";

import CartCategory from "./subcomponents/CartCategory";
import CartItem from "./subcomponents/CartItem";

import { PropsCart } from "./cart.types";
import style from "./cart.module.scss";

const Cart = ({ title, buttons }: PropsCart) => {
  const { user } = useAuthState();

  return (
    <section className={style.container_main}>
      <div className={style.container_menu}>
        <Icon
          className={style.icon_cart}
          icon="material-symbols:shopping-cart-rounded"
        />
        <h2>{title}</h2>
        <Icon className={style.icon_close} icon="ci:close-sm" />
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
        <CartCategory title="Salgados">
          <CartItem name="Coxinha" quantity={1} pricePerUnit={1} borderDashed />
          <CartItem name="Pastel" quantity={1} pricePerUnit={1} borderDashed />
        </CartCategory>
        <CartCategory title="Bebidas">
          <CartItem
            name="Coca-Cola"
            quantity={1}
            pricePerUnit={1}
            borderDashed
          />
          <CartItem
            name="Suco de Laranja"
            quantity={1}
            pricePerUnit={1}
            borderDashed
          />
        </CartCategory>
      </div>

      <span className={style.span_total_area}>
        <p className={style.text}>Total:</p>
        <p className={style.price}>R$ 26,00</p>
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
