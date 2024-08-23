"use client";

import { Url } from "next/dist/shared/lib/router/router";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import style from "@/components/Aside/aside.module.scss";
import Link from "next/link";

interface propItemAside {
  isOpen: boolean;
  item: {
    name: string;
    icon: string;
    url: Url;
  };
}

const ItemAside = ({ isOpen, item }: propItemAside) => {
  const pathCurrent = usePathname();
  const urlItem = item.url.toString();
  const condiction =
    urlItem === "/" ? pathCurrent === urlItem : pathCurrent.includes(urlItem);

  return (
    <li className={style.item + (condiction ? ` ${style.selected}` : "")}>
      <Link href={item.url} className={style.link}>
        <Icon
          icon={item.icon}
          className={style.icon + (isOpen ? ` ${style.min}` : "")}
        />
        <p className={style.text + (isOpen ? "" : ` ${style.inactive}`)}>
          {item.name}
        </p>
      </Link>
    </li>
  );
};

export default ItemAside;
