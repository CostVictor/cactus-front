import { ChangeEvent } from "react"
import { PropsBaseInputConfigWriting, PropsBaseInputTypes } from "./baseinput.types";
import { writingRules } from "../variables";
import { typeValidations } from "../validations";
import { formatCapitalize, writingFormatters } from "../utils";

/**
 * Manipula a mudança de valor de um campo de entrada.
 *
 * @param event - Evento de mudança do campo de entrada.
 * @param config - Configurações opcionais para a entrada.
 * @returns O valor processado após aplicar as regras e formatações.
 */
export const handleChangeValue = (
  event: ChangeEvent<HTMLInputElement>,
  config?: PropsBaseInputConfigWriting
) => {
  const { rules, setFormat, capitalize } = config ?? {};
  let value = event.target.value.trimStart().replace("  ", " ");

  // Aplica as regras de validação de escrita.
  Object.keys(rules ?? {}).forEach((rule) =>
    value = value.replace(writingRules[rule as keyof typeof writingRules], "")
  );

  // Aplica o formato de escrita.
  value = setFormat ? writingFormatters[setFormat](value) : value;
  if (capitalize) value = formatCapitalize(value, capitalize);

  return value
}

/**
 * Recupera as regras de validação com base no tipo de entrada.
 *
 * @param {PropsBaseInputTypes} type - O tipo do campo de entrada.
 * @returns {object} Um objeto contendo as regras de validação para o tipo de entrada especificado.
 * Se o tipo for "password", retorna a validação diretamente. Caso contrário, retorna um objeto
 * com o tipo como chave e a validação como valor. Se o tipo não for encontrado em `typeValidations`,
 * retorna um objeto vazio.
 */
export const getValidationByType = (type: PropsBaseInputTypes): object => {
  if (type in typeValidations) {
    const validation = typeValidations[type as keyof typeof typeValidations]();

    if (typeof validation === "object") {
      return validation
    }

    return { [type]: validation }
  }

  return {}
}
