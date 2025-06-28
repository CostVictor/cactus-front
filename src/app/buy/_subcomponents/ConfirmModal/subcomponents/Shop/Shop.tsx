import useCart from "@/hooks/context/useCart";

import { PropsShop } from "./shop.types";
import style from "./shop.module.scss";

const Shop = ({ cartRef }: PropsShop) => {
  const { cartLunch, cartSnack } = useCart;
  const { lunch, snacks } = cartRef === "cartLunch" ? cartLunch() : cartSnack();

  return (
    <div className={style.container_main}>
      {!!lunch && (
        <article className={style.container_category}>
          <h4>Almoço</h4>
          <ul>
            <li>
              -<span>{lunch.basePrice}</span>
            </li>
            {lunch.items.map((item) => (
              <li key={item.name}>
                - ({item.quantity}) {item.name}
                <span>{item.quantity > 1 ? item.price : "--"}</span>
              </li>
            ))}
          </ul>
        </article>
      )}

      {Object.entries(snacks || {}).map(([category, { items }]) => (
        <article key={category} className={style.container_category}>
          <h4>{category}</h4>
          <ul>
            {items.map((item) => (
              <li key={item.name}>
                - ({item.quantity}) {item.name}
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
};

export default Shop;
