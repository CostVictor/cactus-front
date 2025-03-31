import { PropsInputCustomValidation } from "./types"

export const genericValidations = {
  required: () => (value) => !!value || "Este campo é obrigatório.",
  minLength: (min: number) => (value) => value.length >= min || `Este campo deve possuir, pelo menos, "${min}" caracteres.`,
  checkOption: (options: string[]) => (value) => options.includes(value) || "Selecione uma opção válida.",
} as const satisfies PropsInputCustomValidation

export const typeValidations = {
  email: () => (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) || 'Este endereço de e-mail é inválido.',
  price: () => (value) => !!parseFloat(value.replace(/\D/g, "")) || 'O item não pode ser gratuito.',
  tel: () => (value) => /^\(\d{2}\) \d{5}-\d{4}$/.test(value) || 'O número de telefone deve possuir "11" dígitos.',
  "demanding-password": () => ({
    minLength: (value) => value.length >= 12 || 'A senha deve possuir, pelo menos, "12" caracteres.',
    hasUpperCase: (value) => /[A-Z]/.test(value) || 'A senha deve conter pelo menos um caractere maiúsculo.',
    hasLowerCase: (value) => /[a-z]/.test(value) || 'A senha deve conter pelo menos um caractere minúsculo.',
    hasNumber: (value) => /\d/.test(value) || 'A senha deve conter pelo menos um número.',
    hasSymbol: (value) => /[\W_]/.test(value) || 'A senha deve conter pelo menos um símbolo especial.',
  })
} as const satisfies PropsInputCustomValidation
