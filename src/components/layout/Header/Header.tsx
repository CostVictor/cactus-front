"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import useModal from "@/hooks/context/useModal";
import useAuth from "@/hooks/context/useAuth";

import Button from "@/components/commom/Button";
import NavLink from "../NavLink";

import { yesevaOne } from "@/styles/fonts";
import { PropsHeader } from "./header.types";
import MenuHeader from "./subcomponents/MenuHeader";
import style from "./header.module.scss";

const Header = ({ targets }: PropsHeader) => {
  const [withShadow, setWithShadow] = useState<boolean>(false);
  const {
    state: { isAuthenticated },
  } = useAuth();

  const {
    actions: { addNewModal, removeModal },
  } = useModal();

  useEffect(() => {
    /**
     * Define a posição do header de acordo com a posição do scroll.
     */
    const handleWithShadow = () => setWithShadow(window.scrollY > 0);

    window.addEventListener("scroll", handleWithShadow);
    return () => window.removeEventListener("scroll", handleWithShadow);
  }, []);

  return (
    <header
      className={`${style.container_main} ${
        withShadow ? style.shadow : ""
      }`.trim()}
    >
      <div className={style.container_logo}>
        <Image src="/icone.png" alt="Icone do cactus." width={20} height={30} />
        <h1 className={`${yesevaOne.className} ${style.title}`}>CACTUS</h1>
      </div>

      <motion.div
        layoutId="menuHeader"
        transition={{ duration: 0.15 }}
        className={style.container_menu}
      >
        <Icon
          icon="material-symbols:menu-rounded"
          onClick={() =>
            addNewModal(
              <MenuHeader
                targets={targets}
                isAuthenticated={isAuthenticated}
                removeModal={removeModal}
              />
            )
          }
          className={style.icon}
        />
      </motion.div>

      <div
        id="header-links_targets"
        className={`${style.container_content} ${style.auto_left}`}
        style={{ gap: "1.8rem" }}
      >
        {targets?.map((target) => (
          <NavLink
            key={`link-target_${target.link}`}
            text={target.text}
            link={target.link}
          />
        ))}
      </div>

      {!isAuthenticated && (
        <div className={style.container_content}>
          {targets?.length ? <hr className={style.division} /> : null}
          <Link href="/register">
            <Button text="Cadastrar" />
          </Link>
          <Link href="/login">
            <Button text="Logar" appearance="main" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
