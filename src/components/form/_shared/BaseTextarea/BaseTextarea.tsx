import { useWatch, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import clsx from "clsx";

import { inter } from "@/styles/fonts";
import { genericValidations } from "../validations";

import useFocus from "../_hooks/useFocus";
import Label from "../_subcomponents/Label";
import Message from "../_subcomponents/Message";

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
  const { isFocused, setIsFocused } = useFocus();

  const {
    initValue,
    valueRules,
    isMessageMode,
    expandTo: expandTo,
  } = config ?? {};

  const defaultValue = initValue || "";
  const textareaValue = (useWatch({ name, control }) ?? defaultValue) as string;

  const textareaClass = clsx(inter.className, style.textarea, {
    [style.message_mode]: isMessageMode,
    [style.inactive]: inactive,
    [style.closed]: !isFocused,
  });

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
        hasValue={!!textareaValue && isFocused}
      />

      <motion.textarea
        id={name}
        {...register(name, { validate: validationsRules })}
        initial={{ height: "50px", color: "var(--bg-primary)" }}
        animate={
          isFocused
            ? { height: expandTo || "120px", color: "var(--black-primary)" }
            : undefined
        }
        transition={{
          color: {
            delay: isFocused ? 0.2 : 0,
            duration: isFocused ? 0.2 : 0.1,
          },
          height: {
            delay: isFocused ? 0.15 : 0,
            duration: isFocused ? 0.25 : 0.18,
          },
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        defaultValue={defaultValue}
        className={textareaClass}
      />
    </div>
  );
};

export default BaseTextarea;
