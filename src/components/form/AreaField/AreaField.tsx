import { useFormContext } from "react-hook-form";

import BaseTextarea from "../_shared/BaseTextarea";
import Message from "../_shared/_subcomponents/Message";
import { FocusProvider } from "../_shared/_hooks/useFocus";

import { PropsAreaField } from "./areafield.types";
import style from "./AreaField.module.scss";

const AreaField = (props: PropsAreaField) => {
  const {
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[props.name];
  const [message, isError] = [
    (fieldError?.message as string) || props.message,
    !!fieldError?.message,
  ];

  return (
    <div>
      <FocusProvider>
        <BaseTextarea {...props} />
      </FocusProvider>
      {!!message && <Message text={message} isError={isError} />}
    </div>
  );
};

export default AreaField;
