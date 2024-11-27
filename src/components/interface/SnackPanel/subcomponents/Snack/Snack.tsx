import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { revealGrow } from "@/styles/animations";
import { PropsSnack } from "./snack.types";
import { formatMoney } from "@/utils/formatters";
import style from "./snack.module.scss";

const Snack = ({ name, price, quantity_in_stock, path_img }: PropsSnack) => {
  const lowQuantityInStock = quantity_in_stock <= 5;

  return (
    <motion.article
      variants={revealGrow}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={style.container_main}
    >
      <div className={style.header}>
        <div className={style.container_info_stock}>
          <p>Em estoque:</p>
          {lowQuantityInStock && (
            <Icon
              className={style.icon}
              icon="material-symbols:warning-rounded"
            />
          )}
          <p
            style={
              lowQuantityInStock ? { color: "var(--red-tertiary)" } : undefined
            }
          >
            {quantity_in_stock}
          </p>
        </div>
        <Icon icon="majesticons:pencil-alt-line" />
      </div>

      <div className={style.body}>
        {path_img && (
          <Image
            className={style.img}
            src={path_img}
            alt={`Imagem do item ${name}.`}
            width={150}
            height={50}
          />
        )}

        <h3 className={style.title}>{name}</h3>
        <p className={style.price}>{formatMoney(price)}</p>
      </div>
    </motion.article>
  );
};

export default Snack;
