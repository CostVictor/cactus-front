import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

import { averiaSansLibre } from "@/styles/fonts";
import { PropsHeader } from "../../header.types";

import useModalActions, { useModalState } from "@/hooks/context/useModal";
import useAuthState from "@/hooks/context/useAuth";

import Container from "@/components/layout/Container";
import NavLink from "@/components/navigation/NavLink";
import Button from "@/components/forms/Button";

import style from "./menuheader.module.scss";

const MenuHeader = ({ targets }: PropsHeader) => {
  const { addNewModal, removeModal } = useModalActions();
  const { isAuthenticated } = useAuthState();
  useModalState();

  return (
    <motion.div
      layoutId="menuHeader"
      transition={{ duration: 0.15 }}
      className={style.container_menu}
      onClick={() =>
        addNewModal(
          <motion.nav
            layoutId="menuHeader"
            transition={{ duration: 0.18 }}
            className={style.menu}
          >
            <div className={style.header}>
              <Icon
                icon="ci:close-sm"
                onClick={() => removeModal(-1)}
                className={style.icon}
              />
              <h2 className={`${averiaSansLibre.className} ${style.title}`}>
                Menu
              </h2>
            </div>

            {!isAuthenticated && (
              <div className={style.container_auth}>
                <Link href="/register">
                  <Button text="Cadastrar" onClick={() => removeModal(-1)} />
                </Link>
                <Link href="/login">
                  <Button
                    text="Logar"
                    appearance="main"
                    onClick={() => removeModal(-1)}
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
                  onClick={() => removeModal(-1)}
                />
              ))}
            </Container>
          </motion.nav>
        )
      }
    >
      <Icon icon="material-symbols:menu-rounded" className={style.icon} />
    </motion.div>
  );
};

export default MenuHeader;
