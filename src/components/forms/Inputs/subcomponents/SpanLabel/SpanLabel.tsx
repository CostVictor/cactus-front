import { AnimatePresence, motion } from "framer-motion";

import { animateSpan } from "./spanlabel.variables";
import { PropsSpanLabel } from "./spanlabel.types";
import style from "./spanlabel.module.scss";

const SpanLabel = ({ text, isActive, inFocus }: PropsSpanLabel) => {
  return (
    <AnimatePresence>
      {(isActive || inFocus) && (
        <motion.span
          className={style.span_main}
          variants={animateSpan}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {inFocus && <span>{">"}</span>}
          <p>{text}</p>
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default SpanLabel;
