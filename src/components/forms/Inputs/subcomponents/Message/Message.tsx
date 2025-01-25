import { motion } from "framer-motion";
import { PropsInputMessage } from "../../input.types";
import style from "./message.module.scss";

import { enterChild } from "@/styles/animations";

const Message = ({ text, isError }: PropsInputMessage) => {
  return (
    <div className={style.container}>
      <motion.p
        key={text}
        variants={enterChild}
        initial="hidden"
        animate="visible"
        className={`${style.text} ${isError ? style.has_error : ""}`.trim()}
      >
        {text}
      </motion.p>
    </div>
  );
};

export default Message;
