import { motion, AnimatePresence } from "framer-motion";
import { useWatch, useFormContext } from "react-hook-form";
import clsx from "clsx";

import { inter } from "@/styles/fonts";
import useFocus from "../../_hooks/useFocus";
import { PropsPreview } from "./preview.types";
import style from "./preview.module.scss";

const Preview = ({ name, initValue }: PropsPreview) => {
  const { control } = useFormContext();
  const { isFocused } = useFocus();

  const defaultValue = initValue || "";
  const currentValue = (useWatch({ name, control }) ?? defaultValue) as string;

  return (
    <AnimatePresence>
      {!!currentValue && !isFocused && (
        <motion.div
          className={style.container_main}
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.18, delay: 0.2 }}
        >
          <p className={clsx(inter.className, style.text)}>{currentValue}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preview;
