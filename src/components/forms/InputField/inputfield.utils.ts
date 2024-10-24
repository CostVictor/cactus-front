import { PropsInputValidation, PropsInputMessage, PropsInputConfig, PropsInputOptions } from "./inputfield.types";
import { notCapitalize } from "./inputfield.variables";

/**
 * Retorna todas as validações que o input necessita para que ocorra o submit do formulário.
 * @param config Configurações do input (Aplica as validações padrão caso não fornecido).
 * @param equalTo Valor de verificação para inputs de confirmação (Opcional).
 * @param required Opção de input obrigatório (Opcional).
 * @returns Validações de registro do input.
 */
export const getRegisterValidation = (config?: PropsInputConfig, options?: PropsInputOptions, equalTo?: string, required?: boolean) => {
  let validation = config?.validation ?? {};

  if (config?.type === "tel") {
    // Define a configuração padrão do input tipo telefone.
    validation = {
      ...validation,
      minLength: 15,
      maxLength: 15,
    };
    config.validation = validation;
  } else if (config?.type === "password") {
    // Define a configuração padrão do input tipo password.
    validation = {
      ...validation,
      minLength: 10,
    };
    config.validation = validation;
  }

  const { minLength, custom } = validation;
  return {
    required: required ? "Este campo é obrigatório." : true,

    minLength: minLength
      ? {
        value: minLength,
        message: `Este campo deve conter ${config?.type === "tel"
          ? `"11" dígitos.`
          : `pelo menos "${minLength}" caracteres.`
          }`,
      }
      : undefined,

    validate: {
      ...custom,
      ...(equalTo
        ? {
          confirm: (value: string) =>
            value === equalTo ||
            "O valor informado neste campo não coincide com o esperado.",
        }
        : {}),
      ...(config?.type === "email"
        ? {
          checkMail: (value: string) =>
            value.includes("@") ||
            "Por favor, defina um e-mail válido."
        }
        : {}),
      ...(config?.type === "password"
        ? {
          hasUpperCase: (value: string) =>
            /[A-Z]/.test(value) ||
            "A senha deve conter pelo menos um caractere maiúsculo.",
          hasLowerCase: (value: string) =>
            /[a-z]/.test(value) ||
            "A senha deve conter pelo menos um caractere minúsculo.",
          hasNumber: (value: string) =>
            /\d/.test(value) || "A senha deve conter pelo menos um número.",
          hasSymbol: (value: string) =>
            /[\W_]/.test(value) ||
            "A senha deve conter pelo menos um símbolo especial.",
        }
        : {}),
      ...(options?.selectOptions
        ? {
          checkOption: (value: string) =>
            options.selectOptions?.includes(value) ||
            "Por favor, selecione uma opção válida."
        }
        : {})
    },
  };
}

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
