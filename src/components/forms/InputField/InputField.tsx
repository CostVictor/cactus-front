import { useState, ChangeEvent, useRef, useMemo } from "react";
import { RegisterOptions } from "react-hook-form";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import { inter } from "@/styles/fonts";
import SelectionPanel from "./subcomponents/SelectionPanel";
import EyePassword from "./subcomponents/EyePassword";
import SpanLabel from "./subcomponents/SpanLabel";
import Message from "./subcomponents/Message";

import {
  formatTel,
  formatPrice,
  changeValidation,
  checkMessageVisible,
} from "./inputfield.utils";

import { getRegisterValidation } from "./inputfield.validators";
import { PropsInputField } from "./inputfield.types";
import { animateLabel } from "./inputfield.variables";
import style from "./inputfield.module.scss";

const InputField = ({
  name,
  label,
  value,
  message,
  equalTo,
  onChange,
  options,
  config,
  filterMode,
  required,
}: PropsInputField) => {
  const [localValue, setLocalValue] = useState<string>(value ?? "");
  const [valueVisible, setValueVisible] = useState<boolean>(false);
  const [inFocus, setInFocus] = useState<boolean>(false);
  const typingTimer = useRef<NodeJS.Timeout>();

  const isMessageVisible = checkMessageVisible(localValue, message);

  /**
   * Variável que armazena as configurações de validação e mensagens de erro do input.
   */
  const registerOptions: RegisterOptions = useMemo(
    () => getRegisterValidation(config, options, equalTo, required),
    [required, config, options, equalTo]
  );

  /**
   * Define o texto do input, filtrando e validando o que o usuário escreve.
   * @param event Evento de change do input.
   */
  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = changeValidation(
      event.target.value,
      config?.validation ?? {}
    );

    // Formata o texto se o input for do tipo telefone.
    if (config?.type === "tel") {
      newValue = formatTel(newValue);
    }

    // Formata o texto se o input for do tipo preço.
    if (config?.type === "price") {
      newValue = formatPrice(newValue);
    }

    setLocalValue(newValue);

    // Aguarda o usuário parar de escrever antes de enviar o texto do input para uso externo (API).
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      if (onChange && !message?.isError) {
        onChange(name, newValue.trimEnd());
      }
    }, 500);
  };

  return (
    <div
      className={`${style.container_main} ${
        filterMode && style.filter_mode
      }`.trim()}
    >
      {!filterMode && (
        <SpanLabel
          text={label}
          isActive={localValue !== ""}
          inFocus={inFocus}
        />
      )}

      <div className={style.container_input}>
        {options?.icon && <Icon className={style.icon} icon={options.icon} />}
        {required && (
          <span
            className={`${inter.className} ${style.span_required} ${
              config?.type === "password" ? style.password_mode : ""
            }`}
          >
            *
          </span>
        )}

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
            changeValue(event);
            config?.register && config.register(name).onChange(event);
          }}
          onFocus={() => setInFocus(true)}
          onBlur={(event) => {
            setInFocus(false);
            config?.register && config.register(name).onBlur(event);
          }}
          className={`${style.input} ${
            isMessageVisible ? style.message_mode : ""
          } ${config?.type === "password" ? style.password_mode : ""} ${
            options?.icon ? style.indent : ""
          }`.trim()}
          type={
            (config?.type === "password" && valueVisible) ||
            config?.type === "tel" ||
            config?.type === "price" ||
            options?.selectOptions
              ? "text"
              : config?.type
          }
          inputMode={config?.type === "price" ? "numeric" : undefined}
          maxLength={config?.validation?.maxLength}
        />

        {config?.type === "password" && (
          <EyePassword
            isValueVisible={valueVisible}
            setValueVisible={setValueVisible}
            isMessageMode={isMessageVisible}
          />
        )}
      </div>

      {isMessageVisible && (
        <Message text={message?.text ?? ""} isError={message?.isError} />
      )}

      {options?.selectOptions && inFocus ? (
        <SelectionPanel
          options={options.selectOptions}
          setLocalValue={setLocalValue}
          localValue={localValue ?? ""}
        />
      ) : null}
    </div>
  );
};

export default InputField;
