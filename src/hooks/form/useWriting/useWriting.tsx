import { useState, ChangeEvent } from "react";
import { PropsUseWriting } from "./usewriting.types";
import { listFormatters, listValidations } from "./usewriting.variables";
import { formatCapitalize } from "./usewriting.utils";

const useWriting = ({ initValue, onChange, config }: PropsUseWriting) => {
  const [currentValue, setCurrentValue] = useState(initValue ?? "");

  /**
   * Define o texto do input, filtrando e validando o que o usuário escreve.
   */
  const changeValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { rules: validations, format, capitalize } = config ?? {};
    let newValue = event.target.value.trimStart().replace("  ", " ");

    Object.keys(validations ?? {}).forEach((validation) =>
      newValue.replace(listValidations[validation], "")
    );

    newValue = format ? listFormatters[format](newValue) : newValue;
    if (capitalize) newValue = formatCapitalize(newValue, capitalize);

    setCurrentValue(newValue);
    onChange?.(event.target.id, newValue);
  };

  return { info: { currentValue }, actions: { changeValue } };
};

export default useWriting;
