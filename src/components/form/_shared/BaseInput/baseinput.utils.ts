import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { ChangeEvent } from "react"

import { PropsBaseInputConfigWriting } from "./baseinput.types";
import { writingRules, writingFormatters } from "../variables";
import { formatCapitalize } from "../utils";

export const handleChangeValue = (
  event: ChangeEvent<HTMLInputElement>,
  field: ControllerRenderProps<FieldValues, string>,
  config?: PropsBaseInputConfigWriting
) => {
  const { rules, setFormat, capitalize } = config ?? {};
  let value = event.target.value.trimStart().replace("  ", " ");

  Object.keys(rules ?? {}).forEach((rule) =>
    value.replace(writingRules[rule], "")
  );

  value = setFormat ? writingFormatters[setFormat](value) : value;
  if (capitalize) value = formatCapitalize(value, capitalize);

  field.onChange(value);
}
