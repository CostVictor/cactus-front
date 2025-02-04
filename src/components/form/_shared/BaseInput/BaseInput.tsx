import { useController, useWatch } from "react-hook-form";
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
  control,
  config,
  inactive,
  required,
  children,
}: PropsBaseInput) => {
  const { initValue, valueRules, writing, icon, isMessageMode } = config ?? {};
  const inputIcon = icon || (inactive ? "basil:user-block-outline" : undefined);
  const isInputOption = type === "password" || !!children;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setIsFocused } = useFocus();

  const inputMode = type === "price" ? "numeric" : undefined;
  const inputType =
    type === "price" || (type === "password" && passwordVisible)
      ? "text"
      : type;

  const inputClass = clsx(style.input, {
    [style.option_mode]: isInputOption,
    [style.message_mode]: isMessageMode,
  });

  const fieldValue = useWatch({ control, name });

  const {
    field,
    formState: { isSubmitting },
  } = useController({
    name,
    control,
    defaultValue: initValue || "",
    rules: {
      validate: {
        required: required ? genericValidations.required() : () => undefined,
        minLength: valueRules?.minLength
          ? genericValidations.minLength(valueRules.minLength)
          : () => undefined,
        ...valueRules?.custom,
        ...(required || !!fieldValue ? getValidationByType(type) : {}),
      },
    },
  });

  return (
    <div
      style={{ position: "relative", display: "flex", width: "100%" }}
      className={className}
    >
      {inputIcon && <Icon className={style.icon} icon={inputIcon} />}

      {required && (
        <span
          className={clsx(inter.className, style.span_required, {
            [style.indent]: isInputOption,
          })}
        >
          *
        </span>
      )}

      <Label
        hasValue={!!field.value}
        htmlFor={field.name}
        inactive={inactive}
        label={label}
      />

      <input
        {...field}
        type={inputType}
        inputMode={inputMode}
        className={inputClass}
        maxLength={valueRules?.maxLength}
        disabled={isSubmitting || inactive}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onInvalid={(event) => event.preventDefault()}
        onChange={(event) => {
          handleChangeValue(event, field, writing);
          onChange?.();
        }}
      />

      {type === "password" && (
        <AnimatePresence>
          <motion.div
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
