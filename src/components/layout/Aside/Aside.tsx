"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import { inter } from "@/styles/fonts";
import { fadeIn } from "@/styles/animations";
import useAuth from "@/hooks/context/useAuth";

import { listAsideItems } from "./aside.variables";
import ItemAside from "./subcomponents/Item";
import style from "./aside.module.scss";

const Aside = () => {
  const {
    state: { isAuthenticated, user },
  } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathCurrent = usePathname();

  useEffect(() => {
    const stateAside = localStorage.getItem("stateAside");
    setIsOpen(stateAside === "true");
  }, []);

  const toggleAside = () =>
    setIsOpen((prevValue) => {
      const newValue = !prevValue;
      localStorage.setItem("stateAside", String(newValue));
      return newValue;
    });

  return (
    <aside className={`${style.aside} ${isOpen ? style.open : ""}`.trim()}>
      <div id="container-menu" className={style.menu}>
        {isOpen ? (
          <>
            <motion.h2
              className={`${inter.className} ${style.title}`}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              Menu
            </motion.h2>
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <Icon
                id="aside-close-menu"
                icon="ci:close-sm"
                className={style.icon_menu}
                onClick={toggleAside}
              />
            </motion.div>
          </>
        ) : (
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Icon
              id="aside-open-menu"
              icon="material-symbols:menu-rounded"
              className={style.icon_menu}
              onClick={toggleAside}
            />
          </motion.div>
        )}
      </div>

      <ul className={style.container_items}>
        {listAsideItems.map(
          (session, index) =>
            (session.requiresAuth ? isAuthenticated : true) &&
            (session.access ? user?.role === session.access : true) && (
              <React.Fragment key={index}>
                {index ? <hr className={style.division}></hr> : null}
                {session.items.map(
                  (item) =>
                    (item.requiresAuth ? isAuthenticated : true) && (
                      <ItemAside
                        key={item.url}
                        name={item.name}
                        icon={item.icon}
                        url={item.url}
                        isOpen={isOpen}
                        isActive={
                          pathCurrent === "/"
                            ? item.url === pathCurrent
                            : item.url.includes(pathCurrent)
                        }
                      />
                    )
                )}
              </React.Fragment>
            )
        )}
      </ul>
    </aside>
  );
};

export default Aside;
