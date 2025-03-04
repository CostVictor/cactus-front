import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import useModalActions from "@/hooks/context/useModal";
import useRequest from "@/hooks/network/useRequest";

import { revealGrow } from "@/styles/animations";
import { BaseSnack } from "@APISCMapping/snacks.types";
import style from "./snack.module.scss";

const Snack = (dataSnack: BaseSnack) => {
  const { addNewModal, removeModal } = useModalActions();
  const {
    actions: { fetchData },
  } = useRequest();

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
          {/* {lowQuantityInStock && (
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
            {data.quantity_in_stock}
          </p> */}
        </div>
        <Icon icon="majesticons:pencil-alt-line" />
      </div>

      {/* <div className={style.body}>
        {data.path_img && (
          <Image
            className={style.img}
            src={data.path_img}
            alt={`Imagem do item ${name}.`}
            width={150}
            height={50}
          />
        )}

        <h3 className={style.title}>{data.name}</h3>
        <p className={style.price}>{formattedPrice}</p>
      </div> */}
    </motion.article>
  );
};

export default Snack;
