import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import { PropsFormattedField } from "./formattedfield.types";
import { FocusProvider } from "../_shared/_hooks/useFocus";

import BaseInput, { PropsBaseInput } from "../_shared/BaseInput";
import Message from "../_shared/_subcomponents/Message";
import style from "./formattedfield.module.scss";

const FormattedField = (props: PropsFormattedField) => {
  const propsFormatField = {
    ...props,
    config: {
      ...props.config,
      isMessageMode: !!props.message,
      writing: { ...props.config?.writing, setFormat: props.type },
      valueRules: {
        ...props.config?.valueRules,
        maxLength: props.type === "tel" ? 15 : undefined,
      },
    },
  } as PropsBaseInput;

  return (
    <div className={style.container_main}>
      <FocusProvider>
        <BaseInput {...propsFormatField}>
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileFocus={{ border: "1px solid var(--red-secondary)" }}
            onTap={() => props.setValue(props.name, "")}
            className={style.container_clean}
          >
            <Icon className={style.icon} icon="game-icons:cancel" />
          </motion.div>
        </BaseInput>
      </FocusProvider>
      {!!props.message && <Message {...props.message} />}
    </div>
  );
};

export default FormattedField;
