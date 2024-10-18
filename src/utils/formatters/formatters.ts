import { PropsFormatterData } from "./formatters.types";

/**
 * Remove espaços em branco do início e do fim das chaves e valores de um objeto.
 * Se o valor de uma chave for um objeto, aplica a mesma formatação recursivamente.
 * @param data O objeto a ser formatado, que pode conter chaves com valores do tipo string ou objetos aninhados do mesmo tipo.
 * @returns O objeto formatado, onde todas as chaves e valores têm espaços em branco removidos.
 */
export const trimmerData = (data: PropsFormatterData) => {
  const formattedObj: PropsFormatterData = {};

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "object") {
      // Aplica a recursividade se for `object`.
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
export const omitKeys = (data: PropsFormatterData, omitTo: string) => {
  const formattedObj: PropsFormatterData = {};

  Object.entries(data).forEach(([key, value]) => {
    // Verifica se a chave contém a string omitTo, caso verdade, não inclui em `formattedObj`.
    if (!key.includes(omitTo)) {
      if (typeof value === 'object') {
        // Aplica a recursividade se for `object`.
        formattedObj[key] = omitKeys(value, omitTo);
      } else {
        formattedObj[key] = value;
      }
    }
  });

  return formattedObj
}
