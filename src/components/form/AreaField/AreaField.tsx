import { useFormContext } from "react-hook-form";

import BaseTextarea from "../_shared/BaseTextarea";
import Message from "../_shared/_subcomponents/Message";
import Preview from "../_shared/_subcomponents/Preview";
import { FocusProvider } from "../_shared/_hooks/useFocus";
import { PropsBaseTextarea } from "../_shared/BaseTextarea";

import { PropsAreaField } from "./areafield.types";
import style from "./areafield.module.scss";

const AreaField = (props: PropsAreaField) => {
  const {
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[props.name];
  const [message, isError] = [
    (fieldError?.message as string) || props.message,
    !!fieldError?.message,
  ];

  const propsAreaField = {
    ...props,
    config: {
      ...props.config,
      isMessageMode: !!message,
    },
  } as PropsBaseTextarea;

  return (
    <div className={style.container_main}>
      <FocusProvider>
        <BaseTextarea {...propsAreaField} />
        <Preview name={props.name} initValue={props.config?.initValue} />
      </FocusProvider>
      {!!message && <Message text={message} isError={isError} />}
    </div>
  );
};

export default AreaField;
