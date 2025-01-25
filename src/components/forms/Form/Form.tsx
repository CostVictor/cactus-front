"use client";

import React, { isValidElement, cloneElement, ReactElement } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { deepMap } from "react-children-utilities";

import { PropsBaseInput } from "../Inputs";
import { PropsForm } from "./form.types";
import { validComponentsField } from "./form.variables";
import { setFormatData, trimmerData, omitKeys } from "./form.utils";
import style from "./form.module.scss";

const Form = ({ children, onSubmit, config }: PropsForm) => {
  const {
    watch,
    setValue,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  return (
    <form
      className={style.container_main}
      onSubmit={handleSubmit((data) =>
        onSubmit(
          setFormatData(
            trimmerData(omitKeys(data, "__toDisregard")),
            config?.outputData
          )
        )
      )}
    >
      {deepMap(children, (child) => {
        if (isValidElement(child)) {
          // Verifica se child é um dos inputs registrados.
          const componentIsValid = validComponentsField.some(
            (validComponent) => child.type === validComponent
          );

          if (componentIsValid) {
            const { name, toDisregard, onChange, message, config } =
              child.props as PropsBaseInput;
            const { validation } = config ?? {};

            const configName = toDisregard ? `${name}__toDisregard` : name;
            const ownCurrent = validation?.own;

            let configOwn = ownCurrent;
            if (ownCurrent?.text.includes("field__")) {
              const targetFieldName = ownCurrent.text.replace("field__", "");
              const allFields = getValues();

              if (allFields.hasOwnProperty(targetFieldName)) {
                configOwn = {
                  ...ownCurrent,
                  text: watch(targetFieldName),
                } as typeof ownCurrent;
              } else {
                throw new Error(
                  `Nenhum campo "${targetFieldName}" foi declarado antes de ${name}.`
                );
              }
            }

            const error = errors[configName]?.message?.toString();
            const configMessage = {
              text: error ? error : message?.text ?? "",
              isError: error ? true : message?.isError ?? false,
            };

            return cloneElement(child as ReactElement<PropsBaseInput>, {
              name: configName,
              message: configMessage,
              config: {
                ...config,
                control: { register },
                validation: {
                  ...validation,
                  own: configOwn,
                },
              },
              onChange: (key: string, newValue: string) => {
                onChange?.(key, newValue);
                setValue(key, newValue);
              },
            });
          }
        }
        return child;
      })}
    </form>
  );
};

export default Form;
