import { useController } from "react-hook-form";

import { PropsBaseInput } from "./baseinput.types";
import { handleChangeValue } from "./baseinput.utils";

const BaseInput = ({
  name,
  type,
  onChange,
  className,
  control,
  config,
  notIncluded,
  inactive,
  required,
}: PropsBaseInput) => {
  const inputType = type === "price" ? "text" : type;

  const {
    field,
    formState: { isSubmitting },
  } = useController({
    name,
    control,
    rules: config?.rules,
    defaultValue: config?.initValue || "",
  });

  return (
    <div>
      <input
        {...field}
        type={inputType}
        className={className}
        disabled={isSubmitting}
        onInvalid={(event) => event.preventDefault()}
        onChange={(event) => {
          handleChangeValue(event, field, config?.writing);
          onChange?.();
        }}
      />
    </div>
  );
};

export default BaseInput;
