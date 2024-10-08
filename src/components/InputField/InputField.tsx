import { useState, ChangeEvent, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RegisterOptions } from "react-hook-form";
import { Icon } from "@iconify/react";

import { animateSpan, animateLabel } from "./inputfield.variables";
import { changeValidation, formatTel } from "./inputfield.utils";
import { PropsInputField } from "./inputfield.types";
import { inter } from "@/styles/fonts";
import style from "./inputfield.module.scss";

const InputField = ({
  name,
  label,
  value,
  errorMessage,
  onChange,
  options,
  config,
  required,
}: PropsInputField) => {
  const [localValue, setLocalValue] = useState<string | undefined>(value);
  const [inFocus, setInFocus] = useState<boolean>(false);
  const typingTimer = useRef<NodeJS.Timeout>();

  const registerOptions: RegisterOptions = useMemo(() => {
    let validation = config?.validation;
    if (config?.type === "tel") {
      validation = {
        ...validation,
        minLength: 15,
        maxLength: 15,
      };
      config.validation = validation;
    }

    const { minLength, custom } = validation ?? {};
    return {
      required: required ? "Este campo é obrigatório." : false,
      minLength: minLength
        ? {
            value: minLength,
            message: `Este campo deve conter ${
              config?.type === "tel"
                ? `"11" dígitos.`
                : `pelo menos "${minLength}" caracteres.`
            }`,
          }
        : undefined,
      validate: {
        ...custom,
      },
    };
  }, [required, config]);


  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = changeValidation(
      event.target.value,
      config?.validation ?? {}
    );

    if (config?.type === "tel") {
      newValue = formatTel(newValue);
    }
    setLocalValue(newValue);

    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      if (onChange && !errorMessage) {
        onChange(name, newValue.trimEnd());
      }
    }, 500);
  };

  return (
    <div className={style.container_main}>
      <AnimatePresence>
        {(localValue || inFocus) && (
          <motion.span
            className={style.span_label}
            variants={animateSpan}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {inFocus && <span>{">"}</span>}
            <p>{label}</p>
          </motion.span>
        )}
      </AnimatePresence>

      <div className={style.container_input}>
        {options?.icon && <Icon className={style.icon} icon={options.icon} />}

        <motion.label
          htmlFor={name}
          className={`${inter.className} ${style.label} ${
            options?.icon ? style.indent : ""
          }`.trim()}
          variants={animateLabel}
          initial="visible"
          animate={localValue || inFocus ? "hidden" : undefined}
        >
          {label}
        </motion.label>

        <input
          id={name}
          value={localValue}
          {...(config?.register ? config.register(name, registerOptions) : {})}
          onChange={(event) => {
            config?.register && config.register(name).onChange(event);
            changeValue(event);
          }}
          onFocus={() => setInFocus(true)}
          onBlur={(event) => {
            config?.register && config.register(name).onBlur(event);
            setInFocus(false);
          }}
          className={`${style.input} ${
            options?.icon ? style.indent : ""
          }`.trim()}
          type={
            config?.type === "tel" || options?.selectOptions
              ? "text"
              : config?.type
          }
          maxLength={config?.validation?.maxLength}
        />
      </div>

      <motion.div>{errorMessage && <p>{errorMessage}</p>}</motion.div>
    </div>
  );
};

export default InputField;
