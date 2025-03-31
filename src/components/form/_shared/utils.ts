import { notCapitalize } from "./variables";
import Fuse from "fuse.js";

/**
 * Filtra as opções fornecidas com base na string alvo usando busca difusa.
 *
 * @param target - A string a ser buscada dentro das opções.
 * @param options - Um array de strings a serem filtradas.
 * @returns Um array de strings que correspondem à string alvo com base na busca difusa.
 *
 * A função normaliza as opções removendo os acentos e, em seguida,
 * usa a biblioteca Fuse.js para realizar uma busca difusa. Se a string alvo for
 * fornecida, ela retorna as opções originais que correspondem à string alvo. Se
 * a string alvo estiver vazia, ela retorna o array original de opções.
 */
export const filterOption = (target: string, options: string[]) => {
  const normalizedOptions = options.map((option) => ({
    normalized: option.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    original: option,
  }));

  const fuse = new Fuse(normalizedOptions, {
    keys: ["normalized", "original"],
    includeScore: true,
    threshold: 0.35,
  });

  return !!target
    ? fuse.search(target).map((result) => result.item.original)
    : options;
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

/**
 * Formata um valor de string como um preço em Real Brasileiro (R$).
 * 
 * A função remove todos os caracteres não numéricos da string de entrada, garante que o 
 * número resultante não exceda 9999 (equivalente a R$ 99,99) e o formata com duas casas decimais.
 * 
 * @param value - O valor da string a ser formatado como preço.
 * @returns A string de preço formatada no formato `R$ xx,xx`.
 */
export const formatPrice = (value: string) => {
  let valueReturn = value.replace(/\D/g, "");

  // Garante que não ultrapasse o valor máximo (9999, equivalente a R$ 99.99)
  valueReturn = Math.min(parseInt(valueReturn || '0'), 9999).toString();

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

export const writingFormatters = {
  price: formatPrice,
  tel: formatTel
} as const
