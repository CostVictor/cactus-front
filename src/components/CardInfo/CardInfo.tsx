import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import { PropsCardInfo } from "./cardinfo.types";
import style from "./cardinfo.module.scss";
import { fadeIn } from "@/styles/animations";

const CardInfo = ({
  title,
  text,
  imgUrl,
  icon,
  isSoldOut,
  markerColor,
  onClick,
}: PropsCardInfo) => {
  return (
    <motion.article
      id={title}
      onClick={!isSoldOut ? onClick : undefined}
      className={`${style.container} ${isSoldOut ? style.sold_out : ""}`.trim()}
      style={
        markerColor ? { borderRight: `solid 2.5rem ${markerColor}` } : undefined
      }
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      whileHover={{ scale: 1.04 }}
      transition={{ delay: 0.1 }}
      viewport={{ once: true }}
    >
      {imgUrl && (
        <Image
          src={imgUrl}
          className={style.img}
          alt={`Imagem do Card ${title}`}
          width={250}
          height={70}
        />
      )}
      {icon && !imgUrl && <Icon icon={icon} className={style.icon} />}
      <h3 className={style.title}>{title}</h3>
      {text && <p className={style.text}>{text}</p>}
      {isSoldOut && <span className={style.span}>Esgotado</span>}
      {markerColor && (
        <Icon
          icon="fluent:tap-single-24-regular"
          className={`${style.icon} ${style.marker}`}
        />
      )}
    </motion.article>
  );
};

export default CardInfo;
