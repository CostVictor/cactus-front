import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import clsx from "clsx";

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
      onClick={onClick}
      className={clsx(style.container, {
        [style.sold_out]: isSoldOut,
      })}
      style={
        markerColor ? { borderRight: `solid 2.5rem ${markerColor}` } : undefined
      }
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      custom={0.1}
      whileHover={{ scale: 1.04 }}
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
