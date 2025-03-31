import { PropsFormatterData } from "./form.types";
import { BaseData } from "@api/types/data";

/**
 * Remove espaços em branco do início e do fim das chaves e valores de um objeto.
 * Se o valor de uma chave for um objeto, aplica a mesma formatação recursivamente.
 * @param data O objeto a ser formatado, que pode conter chaves com valores do tipo string ou objetos aninhados do mesmo tipo.
 * @returns O objeto formatado, onde todas as chaves e valores têm espaços em branco removidos.
 */
export const trimmerData = (data: BaseData) => {
  const formattedObj: BaseData = {};

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Percorre o array e remove os espaços em branco.
      formattedObj[key] = value.map((name) => name.trim())

    } else if (typeof value === "object") {
      // Aplica a recursividade se for `object` e não for `array`.
      formattedObj[key] = trimmerData(value)

    } else {
      formattedObj[key] = value.trim()
    }
  })

  return formattedObj
}

/**
 * Remove chaves de um objeto cujos nomes contêm a string especificada.
 * A remoção ocorre de forma recursiva em objetos aninhados.
 *
 * @param data - O objeto a ser processado.
 * @param omitTo - A string a ser procurada nos nomes das chaves.
 * @returns O objeto resultante com as chaves omitidas.
 */
export const omitKeys = (data: BaseData, omitTo: string) => {
  const formattedObj: BaseData = {};

  Object.entries(data).forEach(([key, value]) => {
    // Verifica se a chave contém a string omitTo, caso verdade, não inclui em `formattedObj`.
    if (!key.includes(omitTo)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        // Aplica a recursividade se for `object`.
        formattedObj[key] = omitKeys(value, omitTo);

      } else {
        formattedObj[key] = value;
      }
    }
  });

  return formattedObj
}

/**
 * Formata os dados de acordo com um formato especificado.
 * @param data - Os dados a serem formatados. Espera-se que seja um objeto onde as chaves são strings.
 * @param format - O formato a ser aplicado aos dados. Pode ser um array de strings ou objetos com as propriedades `name` e `format`.
 * @returns Um novo objeto contendo os dados formatados.
 */
export const setFormatData = (data: BaseData, format?: PropsFormatterData) => {
  if (!format) {
    return data
  }

  const formattedObj: BaseData = {};

  format.forEach(value => {
    if (typeof value === "string") {
      formattedObj[value] = data[value];
    } else {
      const { name, format } = value
      formattedObj[name] = setFormatData(data, format)
    }
  })

  return formattedObj
}
