import { motion } from "framer-motion";
import clsx from "clsx";

import useCart from "@/hooks/context/useCart";

import { PropsCartItem } from "./cartitem.types";
import style from "./cartitem.module.scss";

const CartItem = ({
  cartRef,
  category,
  name,
  price,
  quantity,
  maxQuantity,
  borderDashed,
  choiceNumber,
  dishPrice,
}: PropsCartItem) => {
  const { setLunch, setSnack } = useCart.actions();

  /**
   * Adiciona um item ao carrinho.
   */
  const handdleAdd = () => {
    if (maxQuantity && quantity >= maxQuantity) return;

    if (category === "Almoço") {
      setLunch(name, price, quantity + 1, choiceNumber ?? 0, dishPrice ?? "");
      return;
    }

    setSnack(cartRef, category, name, price, quantity + 1);
  };

  /**
   * Remove um item do carrinho.
   */
  const handdleRemove = () => {
    if (category === "Almoço") {
      setLunch(name, price, quantity - 1, choiceNumber ?? 0, dishPrice ?? "");
      return;
    }

    setSnack(cartRef, category, name, price, quantity - 1);
  };

  return (
    <motion.article
      title={name}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className={style.container_main}
      style={
        borderDashed
          ? { borderLeft: `1px dashed var(--division-intense)` }
          : { borderLeft: `1px solid var(--division-intense)` }
      }
    >
      <div className={style.container_info}>
        <p className={style.name}>{name}</p>
        <p className={style.action} onClick={handdleRemove}>
          -
        </p>
        <p className={style.quantity}>{quantity}</p>
        <p
          onClick={handdleAdd}
          className={clsx(style.action, {
            [style.disabled]: maxQuantity && quantity === maxQuantity,
          })}
        >
          +
        </p>
      </div>
      <p className={style.price}>{price}</p>
    </motion.article>
  );
};

export default CartItem;
