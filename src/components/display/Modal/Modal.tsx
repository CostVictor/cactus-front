"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

import Button from "@/components/form/Button";
import useModalActions from "@/hooks/context/useModal";

import { PropsModal } from "./modal.types";
import { fadeIn, revealGrow } from "@/styles/animations";
import style from "./modal.module.scss";

const Modal = ({
  title,
  message,
  children,
  buttons,
  formMode,
  defaultButtonText = "Fechar",
}: PropsModal) => {
  const { removeModal } = useModalActions();

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

        <div
          key={`content_${title}`}
          className={clsx(style.content, {
            [style.form_mode]: formMode === "content" || formMode === true,
          })}
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
        </div>

        <motion.div
          key={`footer_${title}`}
          className={clsx(style.footer, {
            [style.form_mode]: formMode === "button" || formMode === true,
          })}
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
              appearance="principal"
              onClick={() => removeModal()}
            />
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

export default Modal;
