import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import Link from "next/link";

import { averiaSansLibre } from "@/styles/fonts";
import { PropsMenuHeader } from "./menuheader.types";

import useAuth from "@/hooks/context/useAuth";
import useModal from "@/hooks/context/useModal";

import Container from "@/components/structural/Container";
import NavLink from "@/components/layout/NavLink";
import Button from "@/components/commom/Button";

import style from "./menuheader.module.scss";

const MenuHeader = ({ targets }: PropsMenuHeader) => {
  const modals = useModal();
  const auth = useAuth();

  return (
    <motion.nav
      layoutId="menuHeader"
      transition={{ duration: 0.18 }}
      className={style.menu}
    >
      <div className={style.header}>
        <Icon
          icon="ci:close-sm"
          onClick={() => modals.removeModal(-1)}
          className={style.icon}
        />
        <h2 className={`${averiaSansLibre.className} ${style.title}`}>Menu</h2>
      </div>
      {!auth.isAuthenticated && (
        <div className={style.container_auth}>
          <Link href="/register">
            <Button text="Cadastrar" onClick={() => modals.removeModal(-1)} />
          </Link>
          <Link href="/login">
            <Button
              text="Logar"
              appearance="main"
              onClick={() => modals.removeModal(-1)}
            />
          </Link>
        </div>
      )}
      <Container className={style.content} animateChildren>
        {targets?.map((target, index) => (
          <NavLink
            key={index}
            text={target.text}
            link={target.link}
            onClick={() => modals.removeModal(-1)}
          />
        ))}
      </Container>
    </motion.nav>
  );
};

export default MenuHeader;
