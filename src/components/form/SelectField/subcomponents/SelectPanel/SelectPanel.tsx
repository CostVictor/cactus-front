import { filterOption } from "@/components/form/_shared/utils";
import { useWatch, useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

import useFocus from "../../../_shared/_hooks/useFocus";
import { PropsSelectPanel } from "./selectpanel.types";
import style from "./selectpanel.module.scss";

const SelectPanel = ({ name, options }: PropsSelectPanel) => {
  const { control, setValue, clearErrors } = useFormContext();

  const currentValue = (useWatch({ name, control }) ?? "") as string;
  const { isFocused } = useFocus();

  const filteredOptions = useMemo(
    () => filterOption(currentValue, options),
    [currentValue, options]
  );

  return (
    <AnimatePresence>
      {isFocused && (
        <motion.ul
          initial={{ opacity: 0, maxHeight: 0 }}
          animate={{ opacity: 1, maxHeight: "10rem" }}
          exit={{ opacity: 1, maxHeight: 0 }}
          transition={{ duration: 0.2 }}
          className={style.container_main}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={`option_${index}`}
              className={style.option}
              onMouseDown={() => {
                setValue(name, option);
                clearErrors(name);
              }}
            >
              {option}
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default SelectPanel;
