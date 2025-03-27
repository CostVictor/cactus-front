import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import clsx from "clsx";

import { inter } from "@/styles/fonts";

import { PropsOptionsField } from "./optionsfield.types";
import style from "./optionsfield.module.scss";

const OptionsField = ({
  name,
  label,
  type,
  options,
  message,
  required,
}: PropsOptionsField) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];
  const [hasMessage, isError] = [
    (fieldError?.message as string) || message,
    !!fieldError?.message,
  ];

  const icon =
    type === "radio"
      ? "ic:outline-radio-button-unchecked"
      : "mdi:checkbox-blank-outline";

  const iconChecked =
    type === "radio"
      ? "mdi:checkbox-marked-circle-outline"
      : "ion:md-checkbox-outline";

  const handleKeyDown = (event: React.KeyboardEvent, option: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setValue(name, option, { shouldValidate: true });
    }
  };

  return (
    <div className={style.container_main}>
      <h3 className={inter.className}>{label}</h3>

      {required && (
        <span className={clsx(inter.className, style.span_required)}>*</span>
      )}

      <p className="marker"></p>

      <div className={style.container_options}>
        {options.map((option, index) => (
          <label
            tabIndex={0}
            key={option}
            className={clsx(inter.className, style.option, {
              [style.no_border]: !index,
            })}
          >
            <input {...register(name)} type={type} value={option} />
            <div className={style.marker}>
              <Icon icon={icon} className={style.icon} />
              <Icon
                icon={iconChecked}
                className={clsx(style.icon, style.checked)}
              />
            </div>
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default OptionsField;
