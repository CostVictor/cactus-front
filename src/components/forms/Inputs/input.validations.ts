import { PropsInputCustomValidation } from "./input.types"

export const validations: PropsInputCustomValidation = {
  required: { value: true, required: "Este campo é obrigatório." },
  minLength: (arg) => ({ value: arg, required: `Este campo deve possuir, no mínimo "${arg}" caracteres.` }),
  
  password: {
    minLength: { value: 10, required: 'Este campo deve possuir, no mínimo "10" caracteres.' },
    hasUpperCase: { pattern: { value: /[A-Z]/, message: "A senha deve conter pelo menos um caractere maiúsculo." } },
    hasLowerCase: { pattern: { value: /[a-z]/, message: "A senha deve conter pelo menos um caractere minúsculo." } },
    hasNumber: { pattern: { value: /[a-z]/, message: "A senha deve conter pelo menos um número." } },
    hasSymbol: { pattern: { value: /[\W_]/, message: "A senha deve conter pelo menos um símbolo especial." } },
  }
}
