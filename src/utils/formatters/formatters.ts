import { PropsData, PropsFormatterData } from "./formatters.types";

/**
 * Remove espaços em branco do início e do fim das chaves e valores de um objeto.
 * Se o valor de uma chave for um objeto, aplica a mesma formatação recursivamente.
 * @param data O objeto a ser formatado, que pode conter chaves com valores do tipo string ou objetos aninhados do mesmo tipo.
 * @returns O objeto formatado, onde todas as chaves e valores têm espaços em branco removidos.
 */
export const trimmerData = (data: PropsData) => {
  const formattedObj: PropsData = {};

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
export const omitKeys = (data: PropsData, omitTo: string) => {
  const formattedObj: PropsData = {};

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

/**
 * Formata os dados de acordo com um formato especificado.
 * @param data - Os dados a serem formatados. Espera-se que seja um objeto onde as chaves são strings.
 * @param format - O formato a ser aplicado aos dados. Pode ser um array de strings ou objetos com as propriedades `name` e `format`.
 * @returns Um novo objeto contendo os dados formatados.
 */
export const setFormatData = (data: PropsData, format?: PropsFormatterData) => {
  if (!format) {
    return data
  }

  const formattedObj: PropsData = {};

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


/**
 * Formata um valor monetário no formato brasileiro ou extrai o valor numérico, dependendo do parâmetro `reverse`.
 * @param {string} value - A string de entrada contendo o valor monetário a ser formatado.
 * @param {boolean} [reverse=false] - Se true, retorna o valor numérico no formato padrão (ex.: "120.50"), sem o símbolo de moeda.
 * @returns - O valor monetário formatado. Retorna "0.00" se nenhum número válido for encontrado.
 */
export const convertMoney = (value: string, reverse: boolean = false) => {
  // Obtem os valor numérico do texto.
  const money = value.replace(",", ".").match(/\d+(\.\d+)?/g)

  if (money) {
    const value = money[0]

    if (reverse) {
      return value
    }

    return `R$ ${value.replace(".", ",")}`
  }
  return "0.00"
}
