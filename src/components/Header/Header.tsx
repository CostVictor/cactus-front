"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";

import { yesevaOne } from "@/styles/fonts";
import { PropsHeader } from "./header.types";
import style from "./header.module.scss";
import useMobile from "@/hooks/context/useMobile";
import useAuth from "@/hooks/context/useAuth";
import NavLink from "../NavLink";
import Button from "../Button";

const Header = ({ targets }: PropsHeader) => {
  const auth = useAuth();
  const preview = useMobile();

  return (
    <header className={style.header}>
      <div className={style.container_logo}>
        <Image src="/icone.png" alt="Icone do cactus." width={20} height={30} />
        <h1 className={`${yesevaOne.className} ${style.title}`}>CACTUS</h1>
      </div>

      {preview.isMobile ? (
        <div className={`${style.container_content} ${style.auto_left}`}>
          <Icon icon="material-symbols:menu-rounded" className={style.icon} />
        </div>
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

          {auth.isAuthenticated && (
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
