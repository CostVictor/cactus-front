"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/context/useAuth";
import useMobile from "@/hooks/context/useMobile";
import { inter } from "@/styles/fonts";

import { Icon } from "@iconify/react";
import ItemAside from "./subcomponents/Item";
import style from "./aside.module.scss";

const Aside = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const auth = useAuth();
  const preview = useMobile();

  useEffect(() => {
    const stateAside = localStorage.getItem("stateAside");
    setIsOpen(stateAside === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("stateAside", String(isOpen));
    const aside = document.querySelector("aside");
    aside?.classList.toggle(style.open, isOpen);
  }, [isOpen]);

  const toggleAside = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={style.aside}>
      {!preview.isMobile && (
        <div id="container-menu" className={style.menu}>
          {isOpen ? (
            <>
              <h2 className={`${inter.className} ${style.title}`}>Menu</h2>
              <Icon
                id="aside-close-menu"
                icon="ci:close-sm"
                className={style.icon_menu}
                onClick={toggleAside}
              />
            </>
          ) : (
            <Icon
              id="aside-open-menu"
              icon="material-symbols:menu-rounded"
              className={style.icon_menu}
              onClick={toggleAside}
            />
          )}
        </div>
      )}
      <ul className={style.container_items}>
        <ItemAside
          isOpen={isOpen}
          item={{ name: "Perfil", icon: "lucide:user-round", url: "/profile" }}
        />
        <hr className={style.division} />
        <ItemAside
          isOpen={isOpen}
          item={{ name: "Início", icon: "fluent:home-16-regular", url: "/" }}
        />
        <ItemAside
          isOpen={isOpen}
          item={{
            name: "Almoço",
            icon: "fluent:food-16-regular",
            url: "/lunch",
          }}
        />

        {auth.isAuthenticated && (
          <>
            <hr className={style.division} />
            <ItemAside
              isOpen={isOpen}
              item={{
                name: "Pedidos",
                icon: "ep:dish-dot",
                url: "/orders",
              }}
            />
            <ItemAside
              isOpen={isOpen}
              item={{
                name: "Histórico",
                icon: "majesticons:clipboard-list-line",
                url: "/history",
              }}
            />
            <hr className={style.division} />
            <ItemAside
              isOpen={isOpen}
              item={{
                name: "Estoque",
                icon: "tabler:folder",
                url: "/stock",
              }}
            />
          </>
        )}
      </ul>
    </aside>
  );
};

export default Aside;
