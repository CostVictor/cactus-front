import { useFormContext, useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";
import clsx from "clsx";

import useFocus from "../_hooks/useFocus";
import Label from "../_subcomponents/Label";
import { genericValidations } from "../validations";
import { inter } from "@/styles/fonts";

import { handleChangeValue, getValidationByType } from "./baseinput.utils";
import { PropsBaseInput } from "./baseinput.types";
import style from "./baseinput.module.scss";

const BaseInput = ({
  name,
  label,
  type,
  onChange,
  className,
  config,
  inactive,
  required,
  children,
}: PropsBaseInput) => {
  const {
    control,
    register,
    formState: { isSubmitting },
  } = useFormContext();

  const { initValue, valueRules, writing, icon, isMessageMode } = config ?? {};
  const inputIcon = icon || (inactive ? "basil:user-block-outline" : undefined);
  const isButtonMode = type.includes("password") || !!children;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setIsFocused } = useFocus();

  const inputValue = useWatch({ name, control }) as string;
  const inputMode = type === "price" ? "numeric" : undefined;
  const inputType = type.includes("password")
    ? passwordVisible
      ? "text"
      : "password"
    : type === "price"
    ? "text"
    : type;

  const inputClass = clsx(style.input, {
    [style.button_mode]: isButtonMode,
    [style.message_mode]: isMessageMode,
    [style.indent]: !!inputIcon,
  });

  const validationsRules = {
    required: required ? genericValidations.required() : () => undefined,
    minLength: valueRules?.minLength
      ? genericValidations.minLength(valueRules.minLength)
      : () => undefined,
    ...valueRules?.custom,
    ...(required || !!inputValue ? getValidationByType(type) : {}),
  };

  return (
    <div
      style={{ position: "relative", display: "flex", width: "100%" }}
      className={className}
    >
      {!!inputIcon && <Icon className={style.icon} icon={inputIcon} />}

      {required && (
        <span
          className={clsx(inter.className, style.span_required, {
            [style.indent]: isButtonMode,
          })}
        >
          *
        </span>
      )}

      <Label
        hasValue={!!inputValue}
        htmlFor={name}
        inactive={inactive}
        indent={!!inputIcon}
        label={label}
      />

      <input
        {...register(name, { validate: validationsRules })}
        id={name}
        type={inputType}
        autoComplete={name}
        inputMode={inputMode}
        className={inputClass}
        maxLength={valueRules?.maxLength}
        disabled={isSubmitting || inactive}
        defaultValue={initValue || ""}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onInvalid={(event) => event.preventDefault()}
        onChange={(event) => {
          event.target.value = handleChangeValue(event, writing);
          register(name).onChange(event);
          onChange?.();
        }}
      />

      {type.includes("password") && (
        <AnimatePresence>
          <motion.div
            title={`${passwordVisible ? "Ocultar" : "Exibir"} senha`}
            whileTap={{ scale: 0.9 }}
            whileFocus={{ border: "1px solid var(--red-secondary)" }}
            onTap={() => setPasswordVisible((prevState) => !prevState)}
            className={clsx(style.container_password, {
              [style.message_mode]: isMessageMode,
            })}
          >
            <Icon
              icon={passwordVisible ? "ph:eye-closed-bold" : "ph:eye-bold"}
              className={style.icon}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {children}
    </div>
  );
};

export default BaseInput;
