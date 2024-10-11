"use client";

import Image from "next/image";
import Link from "next/link";

import useMobile from "@/hooks/context/useMobile";

import SideIcon from "@/components/layout/SideIcon";
import NavLink from "@/components/layout/NavLink";

import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";

import { title, textRedirect, textLinkRedirect } from "./authpanel.variables";
import { PropsAuthPanel } from "./authpanel.types";
import style from "./authpanel.module.scss";

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
              width={400}
              height={300}
              priority
            />
          </Link>
        )}
        <div className={style.content}>
          <h1 className={style.title}>{title[type]}</h1>

          <Form onSubmit={(data) => console.log(data)}>
            <InputField
              name="name"
              label="Nome e sobrenome"
              config={{
                validation: {
                  capitalize: "all",
                  notNumber: true,
                  notSymbol: true,
                },
              }}
              required
            />
            <InputField
              name="tel"
              label="Telefone"
              config={{ type: "tel" }}
              required
            />
            <InputField
              name="email"
              label="E-mail"
              config={{ type: "email" }}
              required
            />
            <InputField name="city_state" label="Cidade e estado" required />
            <InputField
              name="password"
              label="Senha"
              config={{ type: "password" }}
              message={{
                text: "A senha deve incluir pelo menos: uma letra maiúscula, uma letra minúscula, um número e um símbolo especial.",
              }}
              required
            />
            <InputField
              name="password_conf"
              label="Confirmar senha"
              config={{ type: "password" }}
              equalTo="password"
              required
            />
          </Form>

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
