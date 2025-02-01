import { motion, AnimatePresence } from "framer-motion";
import useFocus from "../../_hooks/useFocus";

import { animateLabel, animateSpanLabel } from "./label.variants";
import { PropsLabel } from "./label.types";
import style from "./label.module.scss";

const Label = ({
  hasValue,
  label,
  htmlFor,
  initHidden,
  indent,
  inactive,
}: PropsLabel) => {
  const { isFocused } = useFocus();

  return (
    <>
      <AnimatePresence>
        {(hasValue || isFocused) && (
          <motion.span
            className={`${style.span_label} ${
              inactive ? style.inactive : ""
            }`.trim()}
            variants={animateSpanLabel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {isFocused && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                {">"}
              </motion.span>
            )}
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.label
        htmlFor={htmlFor}
        variants={animateLabel}
        initial={initHidden ? "hidden" : "visible"}
        animate={hasValue || isFocused ? "hidden" : "visible"}
        className={`${style.label} ${indent ? style.indent : ""} ${
          inactive ? style.inactive : ""
        }`.trim()}
      >
        {label}
      </motion.label>
    </>
  );
};

export default Label;
