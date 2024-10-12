import { PropsTextPanel, PropsTextLinkPanel } from "./authpanel.types"

export const title: PropsTextPanel = {
  login: "Login",
  register: "Cadastro"
}

export const textRedirect: PropsTextPanel = {
  login: "Não possui uma conta?",
  register: "Já possui uma conta?"
}

export const textLinkRedirect: PropsTextLinkPanel = {
  login: { text: "Cadastre-se", link: "/register" },
  register: { text: "Ir ao login", link: "/login" }
}

export const cities = [
  'Apodi', 'Campo Grande', 'Caraúbas', 'Felipe Guerra', 'Itaú', 'Rodolfo Fernandes', 'Severiano Melo', 'Umarizal'
]
