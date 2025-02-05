import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import { PropsFormattedField } from "./formattedfield.types";
import { FocusProvider } from "../_shared/_hooks/useFocus";

import BaseInput, { PropsBaseInput } from "../_shared/BaseInput";
import Message from "../_shared/_subcomponents/Message";
import style from "./formattedfield.module.scss";

const FormattedField = (props: PropsFormattedField) => {
  const {
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[props.name];
  const [message, isError] = [
    (fieldError?.message as string) || props.message,
    !!fieldError?.message,
  ];

  const propsFormatField = {
    ...props,
    config: {
      ...props.config,
      isMessageMode: !!message,
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
            title="Limpar campo"
            whileTap={{ scale: 0.9 }}
            whileFocus={{ border: "1px solid var(--red-secondary)" }}
            className={style.container_clean}
            onTap={() => {
              setValue(props.name, "");
              clearErrors(props.name);
            }}
          >
            <Icon className={style.icon} icon="game-icons:cancel" />
          </motion.div>
        </BaseInput>
      </FocusProvider>
      {!!message && <Message text={message} isError={isError} />}
    </div>
  );
};

export default FormattedField;
