"use client";

import React, { isValidElement, cloneElement, Children } from "react";
import { useForm, FieldValues } from "react-hook-form";

import { PropsForm } from "./form.types";
import { checkHasInputConfirm, getFormMessage } from "./form.utils";
import { trimmerData, omitKeys, setFormatData } from "@/utils/formatters";
import Button from "@/components/commom/Button";

import InputField from "../InputField";
import style from "./form.module.scss";

const Form = ({
  children,
  onSubmit,
  includeButton,
  formatData,
  isLoading,
  defaultButtonSubmitText = "Enviar",
}: PropsForm) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit(
          setFormatData(trimmerData(omitKeys(data, "remove")), formatData)
        )
      )}
      className={style.container_main}
    >
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

      <div className={style.container_button}>
        {includeButton && (
          <Button
            type="button"
            text={includeButton.text}
            onClick={includeButton.onClick}
          />
        )}
        <Button
          type={isLoading ? "button" : "submit"}
          text={defaultButtonSubmitText}
          appearance={includeButton ? "main" : "submit"}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default Form;
