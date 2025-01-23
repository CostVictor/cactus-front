import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";

import useWriting from "@/hooks/formatter/useWriting";
import SpanLabel from "../subcomponents/SpanLabel";
import EyePassword from "./subcomponents/EyePassword";
import Message from "../subcomponents/Message";

import { inter } from "@/styles/fonts";
import { animateLabel } from "../input.variants";

import { PropsTextField, PropsTextFieldConfig } from "./textfield.types";
import style from "./textfield.module.scss";

const TextField = ({
  name,
  label,
  initValue,
  config,
  message,
  inactive,
  required,
}: PropsTextField) => {
  const { type, capitalize, icon, validation, register }: PropsTextFieldConfig =
    {
      type: "text",
      ...config,
    };

  const {
    info: { currentValue },
    actions: { changeValue },
  } = useWriting({
    initValue,
    capitalize,
  });

  const [inFocus, setInFocus] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isMessageVisible =
    message?.text && (message.isError || !currentValue) ? true : false;

  return (
    <div className={style.container_main}>
      <SpanLabel
        text={label}
        isActive={currentValue !== ""}
        inFocus={inFocus}
      />

      <div className={style.container_input}>
        {icon && <Icon className={style.icon} icon={icon} />}
        {required && (
          <span
            className={`${inter.className} ${style.span_required} ${
              type === "password" && style.password_mode
            }`.trim()}
          >
            Obrigatório
          </span>
        )}

        <motion.label
          htmlFor={name}
          className={`${inter.className} ${style.label} ${
            icon && style.indent
          }`.trim()}
          variants={animateLabel}
          initial="visible"
          animate={currentValue || inFocus ? "hidden" : undefined}
        >
          {label}
        </motion.label>

        <input
          id={name}
          value={currentValue}
          onChange={changeValue}
          onFocus={() => setInFocus(true)}
          className={`${style.input} ${
            isMessageVisible && style.message_mode
          } ${type === "password" && style.password_mode} ${
            icon && style.indent
          }`.trim()}
          type={type === "password" && isPasswordVisible ? "text" : type}
          inputMode={type !== "password" ? type : "text"}
          maxLength={validation?.value?.maxLength}
        />

        {type === "password" && (
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
