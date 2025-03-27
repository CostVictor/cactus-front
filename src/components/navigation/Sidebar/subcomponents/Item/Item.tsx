"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

import { fadeIn } from "@/styles/animations";
import { PropsItemSidebar } from "./item.types";
import style from "@/components/navigation/Sidebar/sidebar.module.scss";

const ItemSidebar = ({
  name,
  icon,
  url,
  isOpen,
  isActive,
}: PropsItemSidebar) => {
  return (
    <li className={clsx(style.item, { [style.selected]: isActive })}>
      <Link href={url} className={style.link}>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ display: "flex" }}
        >
          <Icon
            icon={icon}
            className={clsx(style.icon, { [style.min]: isOpen })}
          />
        </motion.div>

        <motion.p
          key={`${url} ${String(isOpen)}`}
          className={clsx(style.text, { [style.inactive]: !isOpen })}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {name}
        </motion.p>
      </Link>
    </li>
  );
};

export default ItemSidebar;
