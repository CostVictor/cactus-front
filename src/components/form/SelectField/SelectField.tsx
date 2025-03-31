import { useFormContext } from "react-hook-form";

import BaseInput, { PropsBaseInput } from "../_shared/BaseInput";
import { genericValidations } from "../_shared/validations";
import { FocusProvider } from "../_shared/_hooks/useFocus";
import Message from "../_shared/_subcomponents/Message";

import { PropsSelectField } from "./selectfield.types";
import SelectPanel from "./subcomponents/SelectPanel";
import style from "./selectfield.module.scss";

const SelectField = (props: PropsSelectField) => {
  const {
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[props.name];
  const [message, isError] = [
    (fieldError?.message as string) || props.message,
    !!fieldError?.message,
  ];

  const propsSelectField = {
    ...props,
    type: "text",
    config: {
      ...props.config,
      isMessageMode: !!message,
      valueRules: {
        ...props.config?.valueRules,
        custom: {
          ...props.config?.valueRules?.custom,
          checkOptions: genericValidations.checkOption(props.options),
        },
      },
    },
  } as PropsBaseInput;

  return (
    <div className={style.container_main}>
      <FocusProvider>
        <BaseInput {...propsSelectField} />
        {!!message && <Message text={message} isError={isError} />}
        <SelectPanel {...props} />
      </FocusProvider>
    </div>
  );
};

export default SelectField;
