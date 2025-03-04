import { useWatch, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import clsx from "clsx";

import { inter } from "@/styles/fonts";
import { genericValidations } from "../validations";

import useFocus from "../_hooks/useFocus";
import Label from "../_subcomponents/Label";

import { PropsBaseTextarea } from "./basetextarea.types";
import style from "./basetextarea.module.scss";

const BaseTextarea = ({
  name,
  label,
  required,
  inactive,
  config,
}: PropsBaseTextarea) => {
  const { register, control } = useFormContext();
  const { setIsFocused } = useFocus();

  const { initValue, valueRules, isMessageMode } = config ?? {};
  const textareaValue = useWatch({ name, control }) as string;

  const validationsRules = {
    required: required ? genericValidations.required() : () => undefined,
    ...(required || !!textareaValue ? valueRules : {}),
  };

  return (
    <div className={style.container_main}>
      {required && (
        <span className={clsx(inter.className, style.span_required)}>*</span>
      )}

      <Label
        label={label}
        htmlFor={name}
        inactive={inactive}
        hasValue={!!textareaValue}
      />

      <motion.textarea
        id={name}
        {...register(name, { validate: validationsRules })}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        defaultValue={initValue || ""}
        className={clsx(style.textarea, {
          [style.message_mode]: isMessageMode,
          [style.inactive]: inactive,
        })}
      />
    </div>
  );
};

export default BaseTextarea;
