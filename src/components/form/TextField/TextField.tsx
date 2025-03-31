import { useFormContext } from "react-hook-form";
import { PropsTextField } from "./textfield.types";
import { FocusProvider } from "../_shared/_hooks/useFocus";

import Message from "../_shared/_subcomponents/Message";
import BaseInput, { PropsBaseInput } from "../_shared/BaseInput";
import style from "./textfield.module.scss";

const TextField = (props: PropsTextField) => {
  const {
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[props.name];
  const [message, isError] = [
    (fieldError?.message as string) || props.message,
    !!fieldError?.message,
  ];

  const propsTextField = {
    type: "text",
    ...props,
    config: { ...props.config, isMessageMode: !!message },
  } as PropsBaseInput;

  return (
    <div className={style.container_main}>
      <FocusProvider>
        <BaseInput {...propsTextField} />
      </FocusProvider>
      {!!message && <Message text={message} isError={isError} />}
    </div>
  );
};

export default TextField;
