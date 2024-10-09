"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

import { fadeIn } from "@/styles/animations";
import { PropsItemAside } from "./item.types";
import useMobile from "@/hooks/context/useMobile";
import style from "@/components/layout/Aside/aside.module.scss";

const ItemAside = ({ name, icon, url, isOpen, isActive }: PropsItemAside) => {
  const preview = useMobile();

  return (
    <li className={`${style.item} ${isActive ? style.selected : ""}`.trim()}>
      <Link href={url} className={style.link}>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ display: "flex" }}
        >
          <Icon
            icon={icon}
            className={`${style.icon} ${isOpen ? style.min : ""}`.trim()}
          />
        </motion.div>
        {(isOpen || preview.isMobile) && (
          <motion.p
            className={style.text}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {name}
          </motion.p>
        )}
      </Link>
    </li>
  );
};

export default ItemAside;
