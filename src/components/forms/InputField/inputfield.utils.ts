import { PropsInputValidation } from "./inputfield.types";

/**
 * Remove os caracteres não autorizados.
 * @param value Texto recebido através do envento onChange do input.
 * @param validation Validações a serem aplicadas.
 * @returns Texto validado.
 */
export const changeValidation = (value: string, validation: PropsInputValidation) => {
  const { notNumber, notSymbol } = validation
  let valueReturn = value.trimStart().replace("  ", " ")

  if (notNumber) {
    valueReturn = valueReturn.replace(/[0-9]/g, "");
  }

  if (notSymbol) {
    valueReturn = valueReturn.replace(/[^A-Za-zÀ-ÿ0-9\s]/g, "");
  }

  return valueReturn
}

/**
 * Remove caracteres que não são dígitos e formata para o padrão de telefone.
 * @param value Texto a ser formatado.
 * @returns Texto no formato (99) 99999-9999.
 */
export const formatTel = (value: string) => {
  let valueReturn = value.replace(/\D/g, "");

  valueReturn = valueReturn
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\(\d{2}\) \d{5})(\d)/, '$1-$2');

  return valueReturn
}
