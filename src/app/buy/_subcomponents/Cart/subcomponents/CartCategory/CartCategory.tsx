import { motion } from "framer-motion";
import { PropsCartCategory } from "./cartcategory.types";
import style from "./cartcategory.module.scss";

const CartCategory = ({ title, children, basePrice }: PropsCartCategory) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={style.container_main}
    >
      <div className={style.container_title}>
        <h3>{title}</h3>
        {!!basePrice && <p>{basePrice}</p>}
      </div>
      <div className={style.container_content}>{children}</div>
    </motion.section>
  );
};

export default CartCategory;
