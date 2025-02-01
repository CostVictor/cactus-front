import { useController } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useState } from "react";

import useFocus from "../_hooks/useFocus";
import Label from "../_subcomponents/Label";
import { genericValidations } from "../validations";
import { inter } from "@/styles/fonts";

import { PropsBaseInput } from "./baseinput.types";
import { handleChangeValue } from "./baseinput.utils";
import style from "./baseinput.module.scss";

const BaseInput = ({
  name,
  label,
  type,
  onChange,
  className,
  control,
  config,
  notIncluded,
  inactive,
  required,
}: PropsBaseInput) => {
  const { initValue, rules, writing, icon, isMessageMode } = config ?? {};
  const inputIcon = icon || (inactive ? "basil:user-block-outline" : undefined);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setIsFocused } = useFocus();

  const inputMode = type === "price" ? "numeric" : undefined;
  const inputType =
    type === "price" || (type === "password" && passwordVisible)
      ? "text"
      : type;

  const inputClass = [
    style.input,
    type === "password" && style.password_mode,
    isMessageMode && style.message_mode,
  ]
    .filter(Boolean)
    .join(" ");

  const {
    field,
    formState: { isSubmitting },
  } = useController({
    control,
    name: notIncluded ? `${name}__notIncluded` : name,
    defaultValue: initValue || "",
    rules: {
      validate: {
        ...rules?.custom,
        required: required ? genericValidations.required() : () => undefined,
        minLength: rules?.minLength
          ? genericValidations.minLength(rules.minLength)
          : () => undefined,
      },
    },
  });

  return (
    <div
      className={className}
      style={{ position: "relative", display: "flex" }}
    >
      {inputIcon && <Icon className={style.icon} icon={inputIcon} />}

      {required && (
        <span
          className={`${inter.className} ${style.span_required} ${
            inputType === "password" ? style.password_mode : ""
          }`.trim()}
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
        maxLength={rules?.maxLength}
        disabled={isSubmitting || inactive}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onInvalid={(event) => event.preventDefault()}
        onChange={(event) => {
          handleChangeValue(event, field, writing);
          onChange?.();
        }}
      />

      {inputType === "password" && (
        <div
          onClick={() => setPasswordVisible((prevState) => !prevState)}
          className={`${style.container_password} ${
            isMessageMode ? style.message_mode : ""
          }`.trim()}
        >
          <Icon
            icon={passwordVisible ? "ph:eye-closed-bold" : "ph:eye-bold"}
            className={style.icon}
          />
        </div>
      )}
    </div>
  );
};

export default BaseInput;
