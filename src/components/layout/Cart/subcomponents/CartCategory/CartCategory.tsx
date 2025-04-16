import { PropsCartCategory } from "./cartcategory.types";
import style from "./cartcategory.module.scss";

const CartCategory = ({ title, children }: PropsCartCategory) => {
  return (
    <section className={style.container_main}>
      <h3>{title}</h3>
      <div className={style.container_content}>{children}</div>
    </section>
  );
};

export default CartCategory;
