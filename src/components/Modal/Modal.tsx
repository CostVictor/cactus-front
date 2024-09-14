"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Button, { PropsButton } from "../Button";
import style from "./modal.module.scss";
import useModal from "@/hooks/context/useModal";

type ButtonModal = Omit<PropsButton, "link"> & {
  aparence?: "normal" | "main";
};

interface Modal {
  title: string;
  children: ReactNode;
  buttons?: ButtonModal[];
  defaultButtonText?: string;
}

const Modal = ({
  title,
  children,
  buttons,
  defaultButtonText = "Fechar",
}: Modal) => {
  const modals = useModal();

  return (
    <motion.article className={style.body}>
      <div className={style.header}>
        <h2>{title}</h2>
      </div>
      <div className={style.content}>{children}</div>
      <div className={style.footer}>
        {buttons?.length ? (
          buttons.map((button, index) => (
            <Button key={index} cssStyle={{ boxShadow: "none" }} {...button} />
          ))
        ) : (
          <Button
            text={defaultButtonText}
            aparence="main"
            cssStyle={{ boxShadow: "none" }}
            onClick={() => {
              modals.removeModal(-1);
            }}
          />
        )}
      </div>
    </motion.article>
  );
};

export default Modal;
