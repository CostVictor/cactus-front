import { AnimatePresence, motion } from "framer-motion";

import { animateSpan } from "./spanlabel.variables";
import { PropsSpanLabel } from "./spanlabel.types";
import style from "./spanlabel.module.scss";

const SpanLabel = ({ text, isActive, inFocus, bgDark }: PropsSpanLabel) => {
  return (
    <AnimatePresence>
      {(isActive || inFocus) && (
        <motion.span
          className={`${style.span_main} ${bgDark ? style.bg_dark : ""}`.trim()}
          variants={animateSpan}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <AnimatePresence>
            {inFocus && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                {">"}
              </motion.span>
            )}
          </AnimatePresence>
          <p>{text}</p>
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default SpanLabel;
