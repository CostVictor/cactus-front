import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

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
    <motion.div
      className={`${style.container_main} ${colorDark && style.bg_dark} ${
        typeAdd && style.add
      }`.trim()}
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
    </motion.div>
  );
};

export default ItemInfo;
