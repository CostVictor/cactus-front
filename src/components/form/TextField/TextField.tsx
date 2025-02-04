import { PropsTextField } from "./textfield.types";
import { FocusProvider } from "../_shared/_hooks/useFocus";

import Message from "../_shared/_subcomponents/Message";
import BaseInput, { PropsBaseInput } from "../_shared/BaseInput";
import style from "./textfield.module.scss";

const TextField = (props: PropsTextField) => {
  const propsTextField = {
    type: "text",
    ...props,
    config: { ...props.config, isMessageMode: !!props.message },
  } as PropsBaseInput;

  return (
    <div className={style.container_main}>
      <FocusProvider>
        <BaseInput {...propsTextField} />
      </FocusProvider>
      {!!props.message && <Message {...props.message} />}
    </div>
  );
};

export default TextField;
