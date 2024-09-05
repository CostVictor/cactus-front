"use client";

import { Url } from "next/dist/shared/lib/router/router";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { fadeIn } from "@/styles/animations";
import style from "@/components/Aside/aside.module.scss";
import useMobile from "@/hooks/context/useMobile";
import Link from "next/link";

interface ItemAside {
  isOpen: boolean;
  item: {
    name: string;
    icon: string;
    url: Url;
  };
}

const ItemAside = ({ isOpen, item }: ItemAside) => {
  const preview = useMobile();
  const pathCurrent = usePathname();
  const urlItem = item.url.toString();
  const condiction =
    urlItem === "/" ? pathCurrent === urlItem : pathCurrent.includes(urlItem);

  return (
    <li className={style.item + (condiction ? ` ${style.selected}` : "")}>
      <Link href={item.url} className={style.link}>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ display: "flex"}}
        >
          <Icon
            icon={item.icon}
            className={style.icon + (isOpen ? ` ${style.min}` : "")}
          />
        </motion.div>
        {(isOpen || preview.isMobile) && (
          <motion.p
            className={style.text}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {item.name}
          </motion.p>
        )}
      </Link>
    </li>
  );
};

export default ItemAside;
