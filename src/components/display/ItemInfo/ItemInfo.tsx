import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import clsx from "clsx";

import { revealGrow } from "@/styles/animations";
import { IntemInfoProps } from "./iteminfo.types";
import style from "./iteminfo.module.scss";

const ItemInfo = ({
  text,
  alternativeText,
  displayIcon,
  actionIcon,
  colorDark,
  typeAdd,
  onClick,
}: IntemInfoProps) => {
  return (
    <motion.article
      className={clsx(style.container_main, {
        [style.bg_dark]: colorDark,
        [style.add]: typeAdd,
      })}
      onClick={onClick}
      variants={revealGrow}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {actionIcon && <Icon className={style.icon_action} icon={actionIcon} />}
      {displayIcon && (
        <Icon className={style.icon_display} icon={displayIcon} />
      )}
      <p>{text}</p>
      {alternativeText && <span>{alternativeText}</span>}
    </motion.article>
  );
};

export default ItemInfo;
