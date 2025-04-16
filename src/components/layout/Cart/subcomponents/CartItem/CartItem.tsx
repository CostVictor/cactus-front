import { PropsCartItem } from "./cartitem.types";
import style from "./cartitem.module.scss";

const CartItem = ({
  name,
  quantity,
  pricePerUnit,
  borderDashed,
}: PropsCartItem) => {
  return (
    <article
      title={name}
      className={style.container_main}
      style={
        borderDashed
          ? { borderLeft: `1px dashed var(--division-intense)` }
          : { borderLeft: `1px solid var(--division-intense)` }
      }
    >
      <div>
        <p className={style.name}>{name}</p>
        <p className={style.action}>-</p>
        <p>{quantity}</p>
        <p className={style.action}>+</p>
      </div>
      <p className={style.price}>R$ 1,00</p>
    </article>
  );
};

export default CartItem;
