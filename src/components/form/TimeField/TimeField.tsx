import { useFormContext } from "react-hook-form";
import clsx from "clsx";

import { inter } from "@/styles/fonts";
import { genericValidations } from "../_shared/validations";

import Message from "../_shared/_subcomponents/Message";
import { PropsTimeField } from "./timefield.types";
import style from "./timefield.module.scss";

const TimeField = ({
  name,
  label,
  type,
  message,
  config,
  required,
}: PropsTimeField) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];
  const [hasMessage, isError] = [
    (fieldError?.message as string) || message,
    !!fieldError?.message,
  ];

  const now = new Date();

  const validationsRules = {
    required: required ? genericValidations.required() : () => undefined,
    time: config?.validateFromNow
      ? type === "time"
        ? (value: string) => {
            const selectedTime = new Date(
              `${now.toISOString().slice(0, 10)}T${value}`
            );
            return selectedTime.getTime() < now.getTime()
              ? "Este horário já passou. Defina um horário válido."
              : undefined;
          }
        : (value: string) => {
            const selectedDateTime = new Date(value);
            return selectedDateTime.getTime() < now.getTime()
              ? "Esta data e horário já passaram. Defina uma data e horário válidos."
              : undefined;
          }
      : () => undefined,
  };

  return (
    <div className={style.container_main}>
      <div className={style.container_input}>
        {required && (
          <span className={clsx(inter.className, style.span_required)}>*</span>
        )}

        <label
          className={clsx(inter.className, style.span_label)}
          htmlFor={name}
        >
          {label}
        </label>
        <input
          {...register(name, { validate: validationsRules })}
          type={type}
          defaultValue={config?.initValue}
          className={clsx(inter.className, style.input, {
            [style.message_mode]: !!hasMessage,
          })}
          min={
            type === "time"
              ? now.toLocaleString("sv").slice(11, 16)
              : now.toLocaleString("sv").slice(0, 16).replace(" ", "T")
          }
        />
      </div>
      {!!hasMessage && <Message text={hasMessage} isError={isError} />}
    </div>
  );
};

export default TimeField;
