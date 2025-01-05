"use client";

import { useEffect, useState, Fragment } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import { inter } from "@/styles/fonts";
import { fadeIn } from "@/styles/animations";
import useAuthState from "@/hooks/context/useAuth";

import { listSidebarItems } from "./sidebar.variables";
import ItemSidebar from "./subcomponents/Item";
import style from "./sidebar.module.scss";

const Sidebar = () => {
  const { isAuthenticated, user } = useAuthState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathCurrent = usePathname();

  useEffect(() => {
    const stateSidebar = localStorage.getItem("stateSidebar");
    setIsOpen(stateSidebar === "true");
  }, []);

  const toggleSidebar = () =>
    setIsOpen((prevValue) => {
      const newValue = !prevValue;
      localStorage.setItem("stateSidebar", String(newValue));
      return newValue;
    });

  return (
    <nav className={`${style.sidebar} ${isOpen ? style.open : ""}`.trim()}>
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
                id="sidebar-close-menu"
                icon="ci:close-sm"
                className={style.icon_menu}
                onClick={toggleSidebar}
              />
            </motion.div>
          </>
        ) : (
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Icon
              id="sidebar-open-menu"
              icon="material-symbols:menu-rounded"
              className={style.icon_menu}
              onClick={toggleSidebar}
            />
          </motion.div>
        )}
      </div>

      <ul className={style.container_items}>
        {listSidebarItems.map(
          (session, index) =>
            (session.requiresAuth ? isAuthenticated : true) &&
            (session.access ? user?.role === session.access : true) && (
              <Fragment key={index}>
                {index ? <hr className={style.division}></hr> : null}
                {session.items.map(
                  (item) =>
                    (item.requiresAuth ? isAuthenticated : true) && (
                      <ItemSidebar
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
              </Fragment>
            )
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
