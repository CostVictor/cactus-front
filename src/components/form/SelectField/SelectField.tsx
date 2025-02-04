import BaseInput, { PropsBaseInput } from "../_shared/BaseInput";
import { genericValidations } from "../_shared/validations";
import { FocusProvider } from "../_shared/_hooks/useFocus";
import Message from "../_shared/_subcomponents/Message";

import { PropsSelectField } from "./selectfield.types";
import SelectPanel from "./subcomponents/SelectPanel";
import style from "./selectfield.module.scss";

const SelectField = (props: PropsSelectField) => {
  const propsSelectField = {
    ...props,
    type: "text",
    config: {
      ...props.config,
      isMessageMode: !!props.message,
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
    <div>
      <FocusProvider>
        <BaseInput {...propsSelectField} />
        <SelectPanel {...props} />
      </FocusProvider>
      {!!props.message && <Message {...props.message} />}
    </div>
  );
};

export default SelectField;
