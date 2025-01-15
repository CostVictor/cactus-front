import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import { revealGrow } from "@/styles/animations";
import { IntemInfoProps } from "./iteminfo.types";
import style from "./iteminfo.module.scss";

const ItemInfo = ({
  text,
  displayIcon,
  actionIcon,
  color,
  appearance,
  onClick,
}: IntemInfoProps) => {
  return (
    <motion.div
      className={`${style.container_main} ${
        color === "dark" && style.bg_dark
      } ${appearance === "add" && style.add}`.trim()}
      onClick={onClick}
      variants={appearance !== "add" ? revealGrow : undefined}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {actionIcon && <Icon className={style.icon_action} icon={actionIcon} />}
      {displayIcon && (
        <Icon className={style.icon_display} icon={displayIcon} />
      )}
      <p>{text}</p>
    </motion.div>
  );
};

export default ItemInfo;
