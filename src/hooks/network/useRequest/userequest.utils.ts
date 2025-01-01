import { PropsErrorResponse } from "@/hooks/network/useRequest/userequest.types";

/**
 * Extrai a mensagem de erro de uma resposta de erro da API.
 * 
 * A função verifica se há uma resposta de erro (err.response) e, se existirem dados de erro,
 * ela tenta extrair e retornar as mensagens de erro de forma estruturada.
 * Se a resposta de erro não for uma string, as mensagens de erro são extraídas dos valores do objeto.
 * Se não houver resposta ou o formato dos dados for inválido, a função retorna uma mensagem genérica.
 * 
 * @param {any} err - O objeto de erro retornado pela requisição da API, geralmente um erro Axios.
 * @returns {string | string[]} - Uma mensagem de erro em formato de string ou um array de strings contendo mensagens de erro.
 */
export const errorExtractor = (err: any): string | string[] => {
  let errorMessage: string | string[] = "A API não está respondendo.";
  if (err.response) {
    const errorResponse: PropsErrorResponse = err.response.data;
    if (errorResponse && typeof errorResponse !== "string") {
      errorMessage = Object.values(errorResponse).flat();
    }
  }
  return errorMessage
}
