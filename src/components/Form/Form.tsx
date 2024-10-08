"use client";

import React, { isValidElement, cloneElement, Children } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import { PropsForm } from "./form.types";
import InputField from "../InputField";
import style from "./form.module.scss";

const Form = ({ children, onSubmit }: PropsForm) => {
  const {
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
    <form onSubmit={handleSubmit(submitForm)} className={style.container}>
      {Children.map(children, (child) =>
        isValidElement(child) && child.type === InputField
          ? cloneElement(child, {
              errorMessage: errors[child.props.name]?.message?.toString(),
              value: child.props.value ?? "",
              config: { ...child.props.config, register: register },
            })
          : child
      )}
    </form>
  );
};

export default Form;
