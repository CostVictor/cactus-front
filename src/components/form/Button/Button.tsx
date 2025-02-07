import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import clsx from "clsx";

import { alatsi } from "@/styles/fonts";
import { PropsButton } from "./button.types";
import style from "./button.module.scss";

const Button = ({
  text,
  type,
  appearance,
  onClick,
  formId,
  isLoading,
  largeMode,
}: PropsButton) => {
  const buttonClass = clsx(alatsi.className, style.button, {
    [style.principal]: appearance === "principal",
    [style.large_mode]: largeMode,
    [style.loading]: isLoading,
  });

  return (
    <motion.button
      form={formId}
      type={type}
      onTap={onClick}
      disabled={isLoading}
      className={buttonClass}
      whileTap={
        !isLoading ? { boxShadow: "var(--shadow-btn-click)" } : undefined
      }
      whileFocus={{
        border: `1px dashed var(--${
          appearance === "principal" ? "white-primary" : "red-secondary"
        })`,
      }}
    >
      {isLoading && (
        <Icon icon="svg-spinners:3-dots-move" className={style.icon} />
      )}
      {text}
    </motion.button>
  );
};

export default Button;
