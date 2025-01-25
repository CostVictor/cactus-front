import { PropsCustomValidation } from "./usevalidation.types"

export const validations = {
  required: { value: true, required: "Este campo é obrigatório." },
  notFree: { validate: (value: string) => parseFloat(value.replace(/\D/g, "")) > 0, required: "O item não pode ser gratuito." },
  email: { pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Por favor, defina um e-mail válido." } },
  tel: { minLength: 15, maxLength: 15, required: "O telefone deve conter, no mínimo, 11 dígitos." },
  password: {
    minLength: { value: 10, required: 'Este campo deve possuir, no mínimo "10" caracteres.' },
    hasUpperCase: { pattern: { value: /[A-Z]/, message: "A senha deve conter pelo menos um caractere maiúsculo." } },
    hasLowerCase: { pattern: { value: /[a-z]/, message: "A senha deve conter pelo menos um caractere minúsculo." } },
    hasNumber: { pattern: { value: /[a-z]/, message: "A senha deve conter pelo menos um número." } },
    hasSymbol: { pattern: { value: /[\W_]/, message: "A senha deve conter pelo menos um símbolo especial." } },
  },
  minLength: (arg: number) => ({ value: arg, required: `Este campo deve possuir, no mínimo "${arg}" caracteres.` }),
  checkOption: (arg: string[]) => ({ validate: (value: string) => arg.includes(value), required: "Por favor, selecione uma opção válida." })
} as const satisfies PropsCustomValidation
