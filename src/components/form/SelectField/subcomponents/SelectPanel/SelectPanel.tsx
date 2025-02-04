import { filterOption } from "@/components/form/_shared/utils";
import { useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import { useMemo } from "react";

import useFocus from "../../../_shared/_hooks/useFocus";
import { PropsSelectPanel } from "./selectpanel.types";
import style from "./selectpanel.module.scss";

const SelectPanel = ({
  name,
  control,
  setValue,
  options,
}: PropsSelectPanel) => {
  const currentValue = (useWatch({ name, control }) ?? "") as string;
  const { isFocused } = useFocus();

  const filteredOptions = useMemo(
    () => filterOption(currentValue, options),
    [currentValue, options]
  );

  return (
    <>
      {isFocused && (
        <motion.ul>
          {filteredOptions.map((option, index) => (
            <motion.li
              key={`option_${index}`}
              className={style.option}
              onMouseDown={() => {
                setValue(name, option);
                control.setError(name, { message: "" });
              }}
            >
              {option}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </>
  );
};

export default SelectPanel;
