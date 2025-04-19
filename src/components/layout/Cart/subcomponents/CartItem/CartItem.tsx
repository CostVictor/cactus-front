import { motion } from "framer-motion";
import clsx from "clsx";

import { PropsCartItem } from "./cartitem.types";
import style from "./cartitem.module.scss";

const CartItem = ({
  category,
  name,
  price,
  quantity,
  maxQuantity,
  borderDashed,
}: PropsCartItem) => {
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
        <p className={style.action}>-</p>
        <p className={style.quantity}>{quantity}</p>
        <p
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
