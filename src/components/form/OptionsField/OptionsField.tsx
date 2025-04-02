import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useMemo } from "react";
import clsx from "clsx";

import { inter } from "@/styles/fonts";
import { genericValidations } from "../_shared/validations";

import { PropsOptionsField, PropsOptions } from "./optionsfield.types";
import style from "./optionsfield.module.scss";

const OptionsField = ({
  name,
  label,
  type,
  options,
  config,
  required,
}: PropsOptionsField) => {
  const {
    register,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];
  const errorMessage = (fieldError?.message ?? "") as string;

  const icon =
    type === "radio"
      ? "ic:outline-radio-button-unchecked"
      : "mdi:checkbox-blank-outline";

  const iconChecked =
    type === "radio"
      ? "mdi:checkbox-marked-circle-outline"
      : "ion:md-checkbox-outline";

  /**
   * Manipula eventos de pressionamento de tecla para seleção de opções.
   * Suporta teclas "Enter" e "Espaço" para interações com elementos radio ou checkbox.
   *
   * @param {React.KeyboardEvent} event - O evento de teclado disparado.
   * @param {PropsOptions} option - A opção associada ao evento.
   * @property {string} [option.value] - O valor da opção (opcional).
   * @property {string} [option.name] - O nome da opção (usado como fallback se value não estiver presente).
   */
  const handleKeyDown = (event: React.KeyboardEvent, option: PropsOptions) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      const optionValue = option.value ?? option.name;

      if (type === "radio") {
        setValue(name, optionValue, { shouldValidate: true });
        return;
      }

      const currentValues = (getValues(name) ?? []) as string[];

      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((value) => value !== optionValue)
        : [...currentValues, optionValue];

      setValue(name, newValues, { shouldValidate: true });
    }
  };

  // Converte o valor de `options` se for string[] para PropsOptions[].
  const optionsMemo = useMemo(() => {
    if (options.every((option) => typeof option === "string")) {
      return options.map((name) => ({ name } as PropsOptions));
    }
    return options;
  }, [options]);

  // Define o erro quando o campo for obrigatório e nenhuma opção estiver disponível.
  if (required && !optionsMemo.length && !errorMessage) {
    setError(name, { message: "Você precisa escolher uma opção" });
  }

  // Define as regras de validação baseadas no tipo de campo.
  let validationRules;
  if (type === "checkbox") {
    validationRules = {
      required: required
        ? (value: string[]) => !!value.length || "Este campo é obrigatório."
        : () => undefined,
    };
  } else {
    validationRules = {
      required: required ? genericValidations.required() : () => undefined,
    };
  }

  return (
    <div className={style.container_main}>
      <h3 className={inter.className}>{label}</h3>

      {required && (
        <span className={clsx(inter.className, style.span_required)}>*</span>
      )}

      <p className="marker"></p>

      {errorMessage && (
        <p className={clsx(inter.className, style.text, style.error)}>
          {errorMessage}
        </p>
      )}

      {!optionsMemo.length && !errorMessage && (
        <p className={clsx(inter.className, style.text)}>
          {config?.messageWhenNotOptions || "Nenhuma opção disponível"}
        </p>
      )}

      <div className={style.container_options}>
        {optionsMemo.map((option, index) => (
          <motion.label
            key={option.name}
            tabIndex={0}
            onKeyDown={(event) => handleKeyDown(event, option)}
            initial={{ backgroundColor: "var(--white-secondary)" }}
            whileHover={{ backgroundColor: "var(--gray-tertiary)" }}
            whileFocus={{ backgroundColor: "var(--gray-tertiary)" }}
            className={clsx(inter.className, style.option, {
              [style.no_border]: !index,
            })}
          >
            <input
              {...register(name, { validate: validationRules })}
              defaultChecked={config?.initChecked?.includes(
                option.value ?? option.name
              )}
              value={option.value ?? option.name}
              type={type}
            />
            <div className={style.marker}>
              <Icon icon={icon} className={style.icon} />
              <Icon
                icon={iconChecked}
                className={clsx(style.icon, style.checked)}
              />
            </div>
            {option.name}
          </motion.label>
        ))}
      </div>
    </div>
  );
};

export default OptionsField;
