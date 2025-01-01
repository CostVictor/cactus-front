import { PropsInputValidation, PropsInputMessage, PropsInputConfig, PropsInputOptions } from "./inputfield.types";
import { notCapitalize } from "./inputfield.variables";

/**
 * Remove os caracteres não autorizados.
 * @param value Texto recebido através do envento onChange do input.
 * @param validation Validações a serem aplicadas.
 * @returns Texto validado.
 */
export const changeValidation = (value: string, validation: PropsInputValidation) => {
  const { notNumber, notSymbol, capitalize } = validation
  let valueReturn = value.trimStart().replace("  ", " ")

  if (notNumber) {
    valueReturn = valueReturn.replace(/[0-9]/g, "");
  }

  if (notSymbol) {
    valueReturn = valueReturn.replace(/[^A-Za-zÀ-ÿ0-9\s]/g, "");
  }

  if (capitalize) {
    valueReturn = formatCapitalize(valueReturn, capitalize)
  }

  return valueReturn
}

/**
 * Define se a mensagem deve está em exibição.
 * @param localValue Texto atual do input.
 * @param message Configuração das mensagens do input.
 */
export const checkMessageVisible = (localValue?: string, message?: PropsInputMessage) => {
  if (message?.text && (message.isError || !localValue)) {
    return true
  }
  return false
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

export const formatPrice = (value: string) => {
  let valueReturn = value.replace(/\D/g, "");

  // Garante que não ultrapasse o valor máximo (10000, equivalente a 100.00)
  valueReturn = Math.min(parseInt(valueReturn || '0'), 10000).toString();

  const integer = valueReturn.slice(0, -2) || '0';
  const decimal = valueReturn.slice(-2).padStart(2, '0');

  return `R$ ${integer},${decimal}`;
}

/**
 * Deixa o texto com a primeira letra em maiúsculo e todo o resto em minúsculo.
 * @param text Texto a ser formatado.
 * @returns Texto formatado.
 */
const formatOneUpper = (text: string) => {
  const newText = text.toLowerCase()

  if (notCapitalize.indexOf(newText) !== -1) {
    return newText
  }
  return `${newText.charAt(0).toUpperCase()}${newText.slice(1)}`
}

/**
 * Retorna o texto capitalizado na primeira letra ou em todas as letras após o espaço.
 * @param text Texto a ser formatado.
 * @param upper Formato do capitalizer.
 * @returns Texto formatado.
 */
export const formatCapitalize = (text: string, upper: "first" | "all") => {
  if (upper === "first") {
    return formatOneUpper(text);
  }

  const listText = text.split(" ").map(word => formatOneUpper(word));
  return listText.join(" ");
}
