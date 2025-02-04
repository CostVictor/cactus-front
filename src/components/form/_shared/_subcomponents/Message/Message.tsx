import { motion } from "framer-motion";
import { enterChild } from "@/styles/animations";
import { inter } from "@/styles/fonts";
import clsx from "clsx";

import { PropsMessage } from "./message.types";
import style from "./message.module.scss";

const Message = ({ text, isError }: PropsMessage) => {
  return (
    <div className={style.container}>
      <motion.p
        key={text}
        variants={enterChild}
        initial="hidden"
        animate="visible"
        className={clsx(inter.className, style.text, {
          [style.has_error]: isError,
        })}
      >
        {text}
      </motion.p>
    </div>
  );
};

export default Message;
