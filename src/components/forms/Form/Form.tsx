"use client";

import React, { isValidElement, cloneElement, Children } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import { PropsForm } from "./form.types";
import { checkHasInputConfirm, getFormMessage } from "./form.utils";

import InputField from "../InputField";
import style from "./form.module.scss";

const Form = ({ children, onSubmit }: PropsForm) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  /**
   * Garante que os campos não pussuam espaços em branco antes e depois do valor.
   * @param data Campos no estado do formulário.
   */
  const submitForm: SubmitHandler<FieldValues> = (data) => {
    Object.keys(data).forEach((key) => {
      data[key] = data[key].trim();
    });
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className={style.container_main}>
      <div className={style.container_inputs}>
        {Children.map(children, (child) =>
          isValidElement(child) && child.type === InputField
            ? cloneElement(child, {
                name: checkHasInputConfirm(
                  child.props.name,
                  child.props.equalTo ?? ""
                ),
                message: getFormMessage(child, errors),
                value: child.props.value,
                equalTo: child.props.equalTo
                  ? watch(child.props.equalTo)
                  : undefined,
                config: {
                  ...child.props.config,
                  register,
                },
              })
            : child
        )}
      </div>
      <button type="submit">Tes</button>
    </form>
  );
};

export default Form;
