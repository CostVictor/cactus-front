import { motion } from "framer-motion";

import { PropsInputMessage } from "../../inputfield.types";
import style from "./message.module.scss";

const Message = ({ text, isError }: PropsInputMessage) => {
  return text ? (
    <motion.div className={style.container}>
      <p className={`${style.text} ${isError ? style.has_error : ""}`.trim()}>
        {text}
      </p>
    </motion.div>
  ) : null;
};

export default Message;
