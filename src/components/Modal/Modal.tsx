"use client";

import Button from "../Button";
import style from "./modal.module.scss";
import useModal from "@/hooks/context/useModal";
import PropsModal from "./modal.types";
import { fadeIn, revealGrow } from "@/styles/animations";
import { motion } from "framer-motion";
import Container from "../Container/Container";

const Modal = ({
  title,
  children,
  buttons,
  defaultButtonText = "Fechar",
}: PropsModal) => {
  const modals = useModal();

  return (
    <motion.article
      className={style.container}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        type: "spring",
        stiffness: 700,
        damping: 23,
      }}
    >
      <motion.div
        layout
        className={style.body}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 55,
        }}
      >
        <div className={style.header}>
          <motion.h2
            key={`title_${title}`}
            variants={revealGrow}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h2>
        </div>

        <Container
          key={`content_${title}`}
          className={style.content}
          isObserver
        >
          {children}
        </Container>

        <motion.div
          key={`footer_${title}`}
          className={style.footer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.15 } }}
        >
          {buttons?.length ? (
            buttons.map((button, index) => (
              <Button
                key={index}
                cssStyle={{ boxShadow: "none" }}
                {...button}
              />
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
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

export default Modal;
