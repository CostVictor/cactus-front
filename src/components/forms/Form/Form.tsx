"use client";

import React, { isValidElement, cloneElement, ReactElement } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { deepMap } from "react-children-utilities";

import { PropsForm } from "./form.types";
import { validComponentsField } from "./form.variables";
import { checkHasInputConfirm, getFormMessage } from "./form.utils";
import { trimmerData, omitKeys, setFormatData } from "@/utils/formatters";
import style from "./form.module.scss";

const Form = ({ children, onSubmit, isLoading, config }: PropsForm) => {
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  return (
    <form
      // onSubmit={handleSubmit((data) =>
      //   onSubmit(
      //     setFormatData(trimmerData(omitKeys(data, "remove")), formatData)
      //   )
      // )}
      className={style.container_main}
    >
      {deepMap(children, (child) => {
        if (isValidElement(child)) {
          const componentInstance = validComponentsField.some(
            (validComponent) => child.type === validComponent
          );
          if (componentInstance) {
            return cloneElement(child as ReactElement, {
              setValue: "valor",
              config: { register },
            });
          }
        }
        return child;
      })}
    </form>
  );
};

export default Form;
