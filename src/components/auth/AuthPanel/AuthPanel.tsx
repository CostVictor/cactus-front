"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import SideIcon from "@/components/interface/SideIcon";
import NavLink from "@/components/navigation/NavLink";

import FormLogin from "./subcomponents/FormLogin";
import FormRegister from "./subcomponents/FormRegister";

import { title, textRedirect, textLinkRedirect } from "./authpanel.variables";
import { PropsAuthPanel } from "./authpanel.types";
import style from "./authpanel.module.scss";

const AuthPanel = ({ type }: PropsAuthPanel) => {
  return (
    <section className={style.container}>
      {Array.from({ length: 4 }).map((_, index) => (
        <SideIcon
          key={index}
          position={index < 2 ? "left" : "right"}
          className={clsx(style.icon, style[`pos_${index + 1}`])}
        />
      ))}

      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo da lanchonete Cactus Comida Boa"
          className={clsx(style.img, { [style.inactive]: type !== "login" })}
          width={160}
          height={110}
          priority
        />
      </Link>

      <div
        className={clsx(style.panel, {
          [style.max_width]: type === "register",
        })}
      >
        {type === "register" && (
          <Link href="/" className={style.img}>
            <Image
              src="/logo.svg"
              alt="Logo da lanchonete Cactus Comida Boa"
              width={400}
              height={300}
              priority
            />
          </Link>
        )}

        <div
          className={style.content}
          style={type === "register" ? { width: "100%" } : undefined}
        >
          <h1 className={style.title}>{title[type]}</h1>

          {type === "login" ? (
            <Suspense
              fallback={
                <span style={{ color: "var(--gray-primary)" }}>
                  Carregando formulário...
                </span>
              }
            >
              <FormLogin />
            </Suspense>
          ) : (
            <FormRegister />
          )}

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
