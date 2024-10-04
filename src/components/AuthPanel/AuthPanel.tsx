"use client";

import Image from "next/image";
import Link from "next/link";

import { title, textRedirect, textLinkRedirect } from "./authpanel.variables";
import { PropsAuthPanel } from "./authpanel.types";
import useMobile from "@/hooks/context/useMobile";
import style from "./authpanel.module.scss";
import SideIcon from "../SideIcon";
import NavLink from "../NavLink";

const AuthPanel = ({ type }: PropsAuthPanel) => {
  const preview = useMobile();

  return (
    <section className={style.container}>
      <p>{String(preview.isMobile)}</p>
      {Array.from({ length: 4 }).map((_, index) => (
        <SideIcon
          key={index}
          position={index < 2 ? "left" : "right"}
          className={`${style.icon} ${style[`pos_${index + 1}`]}`}
        />
      ))}
      {(type === "login" || preview.isMobile) && (
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo da lanchonete Cactus Comida Boa"
            className={style.img}
            width={200}
            height={150}
            priority
          />
        </Link>
      )}
      <div
        className={`${style.panel} ${
          type === "register" && !preview.isMobile ? style.max_width : ""
        }`.trim()}
      >
        {type === "register" && !preview.isMobile && (
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo da lanchonete Cactus Comida Boa"
              className={style.img}
              width={400}
              height={300}
              priority
            />
          </Link>
        )}
        <div className={style.content}>
          <h1 className={style.title}>{title[type]}</h1>

          <div className={style.container_redirect}>
            <p className={style.text}>{textRedirect[type]}</p>
            <NavLink
              text={textLinkRedirect[type].text}
              link={textLinkRedirect[type].link}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPanel;
