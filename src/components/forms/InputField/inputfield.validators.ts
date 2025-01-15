import { PropsInputConfig, PropsInputOptions } from "./inputfield.types";
import { convertMoney } from "@/utils/formatters";

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
    required: required ? "Este campo é obrigatório." : false,

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
      ...(config?.type === "price" && !validation.freeValue
        ? {
          notFree: (value: string) => parseFloat(convertMoney(value, true)) > 0 || "O item não pode ser gratuito."
        }
        : {}),
      ...(options?.selectOptions
        ? {
          checkOption: (value: string) =>
            options.selectOptions?.includes(value) ||
            "Por favor, selecione uma opção válida."
        }
        : {}),
    },
  };
}
