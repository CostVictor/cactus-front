import { motion, AnimatePresence } from "framer-motion";
import useFocus from "../../_hooks/useFocus";
import clsx from "clsx";

import { inter } from "@/styles/fonts";
import { animateLabel, animateSpanLabel } from "./label.variants";
import { PropsLabel } from "./label.types";
import style from "./label.module.scss";

const Label = ({ hasValue, label, htmlFor, indent, inactive }: PropsLabel) => {
  const { isFocused } = useFocus();

  return (
    <>
      <AnimatePresence>
        {(hasValue || isFocused) && (
          <motion.span
            className={clsx(inter.className, style.span_label, {
              [style.inactive]: inactive,
            })}
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
        initial="visible"
        animate={hasValue || isFocused ? "hidden" : "visible"}
        className={clsx(inter.className, style.label, {
          [style.indent]: indent,
          [style.inactive]: inactive,
        })}
      >
        {label}
      </motion.label>
    </>
  );
};

export default Label;
