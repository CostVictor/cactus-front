import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";

import useWriting from "@/hooks/form/useWriting";
import useValidation from "@/hooks/form/useValidation";
import SpanLabel from "../subcomponents/SpanLabel";
import EyePassword from "./subcomponents/EyePassword";
import Message from "../subcomponents/Message";

import { inter } from "@/styles/fonts";
import { animateLabel } from "../input.variants";

import { PropsTextField, PropsTextFieldConfig } from "./textfield.types";
import { getClassTextField } from "./textfield.utils";
import style from "./textfield.module.scss";

const TextField = ({
  name,
  label,
  config,
  message,
  onChange,
  inactive,
  required,
}: PropsTextField) => {
  const fieldConfig = {
    icon: inactive ? "basil:user-block-outline" : config?.icon,
    type: "text",
    ...config,
  } satisfies PropsTextFieldConfig;

  const {
    info: { currentValue },
    actions: { changeValue },
  } = useWriting({
    initValue: fieldConfig.initValue,
    config: fieldConfig.writing,
    onChange,
  });

  const validations = useValidation({
    config: fieldConfig.validation,
    type: fieldConfig.type,
    required,
  });

  const [inFocus, setInFocus] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isMessageVisible =
    message?.text && (message.isError || !currentValue) ? true : false;

  return (
    <div
      className={`${style.container_main} ${
        inactive ? style.inactive : ""
      }`.trim()}
    >
      <SpanLabel
        text={label}
        isActive={currentValue !== ""}
        bgDark={fieldConfig.bgDark}
        inFocus={inFocus}
      />

      <div className={style.container_input}>
        {fieldConfig.icon && (
          <Icon className={style.icon} icon={fieldConfig.icon} />
        )}
        {required && (
          <span
            className={`${inter.className} ${style.span_required} ${
              fieldConfig.type === "password" ? style.password_mode : ""
            }`.trim()}
          >
            *
          </span>
        )}

        <motion.label
          htmlFor={name}
          className={`${inter.className} ${style.label} ${
            fieldConfig.icon ? style.indent : ""
          }`.trim()}
          variants={animateLabel}
          initial={config?.initValue ? "hidden" : "visible"}
          animate={currentValue || inFocus ? "hidden" : "visible"}
        >
          {label}
        </motion.label>

        <input
          {...config?.control?.register(name)}
          id={name}
          value={currentValue}
          onChange={changeValue}
          onFocus={() => setInFocus(true)}
          onBlur={() => setInFocus(false)}
          className={getClassTextField(fieldConfig, isMessageVisible)}
          type={
            fieldConfig.type === "password" && isPasswordVisible
              ? "text"
              : fieldConfig.type
          }
          inputMode={
            fieldConfig.type !== "password" ? fieldConfig.type : "text"
          }
          maxLength={fieldConfig.validation?.maxLength}
        />

        {fieldConfig.type === "password" && (
          <EyePassword
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
            isMessageMode={isMessageVisible}
          />
        )}
      </div>

      {isMessageVisible && (
        <Message text={message?.text ?? ""} isError={message?.isError} />
      )}
    </div>
  );
};

export default TextField;
