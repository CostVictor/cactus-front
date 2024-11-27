"use client";

import { motion } from "framer-motion";

import Button from "@/components/forms/Button";

import Container from "@/components/layout/Container";

import useModal from "@/hooks/context/useModal";

import { PropsModal } from "./modal.types";
import { fadeIn, revealGrow } from "@/styles/animations";
import style from "./modal.module.scss";

const Modal = ({
  title,
  message,
  children,
  buttons,
  notOverflow,
  defaultButtonText = "Fechar",
}: PropsModal) => {
  const {
    actions: { removeModal },
  } = useModal();

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
          className={`${style.content} ${notOverflow && style.not_overflow} ${
            buttons === null && style.complete
          }`.trim()}
          animateChildren
        >
          {message ? (
            Array.isArray(message) ? (
              message.map((msg, index) => (
                <span key={index} className={style.message_span}>
                  <h3>{">"}</h3>
                  <p>{msg}</p>
                </span>
              ))
            ) : (
              <span className={style.message_span}>
                <h3>{">"}</h3>
                <p>{message}</p>
              </span>
            )
          ) : (
            children
          )}
        </Container>

        {buttons !== null && (
          <motion.div
            key={`footer_${title}`}
            className={style.footer}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.15, duration: 0.15 },
            }}
          >
            {buttons?.length ? (
              buttons.map((button, index) => <Button key={index} {...button} />)
            ) : (
              <Button
                text={defaultButtonText}
                appearance="main"
                onClick={() => {
                  removeModal(-1);
                }}
              />
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.article>
  );
};

export default Modal;
