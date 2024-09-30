"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { yesevaOne } from "@/styles/fonts";
import { PropsHeader } from "./header.types";
import style from "./header.module.scss";
import MenuHeader from "./subcomponents/MenuHeader";
import useMobile from "@/hooks/context/useMobile";
import useModal from "@/hooks/context/useModal";
import useAuth from "@/hooks/context/useAuth";
import NavLink from "../NavLink";
import Button from "../Button";

const Header = ({ targets }: PropsHeader) => {
  const auth = useAuth();
  const preview = useMobile();
  const modals = useModal();

  return (
    <header className={style.header}>
      <div className={style.container_logo}>
        <Image src="/icone.png" alt="Icone do cactus." width={20} height={30} />
        <h1 className={`${yesevaOne.className} ${style.title}`}>CACTUS</h1>
      </div>

      {preview.isMobile ? (
        <motion.div
          layoutId="menuHeader"
          transition={{ duration: 0.15 }}
          className={`${style.container_content} ${style.auto_left}`}
        >
          <Icon
            icon="material-symbols:menu-rounded"
            onClick={() => modals.addNewModal(<MenuHeader targets={targets} />)}
            className={style.icon}
          />
        </motion.div>
      ) : (
        <>
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

          {!auth.isAuthenticated && (
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
        </>
      )}
    </header>
  );
};

export default Header;
