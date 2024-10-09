export interface PropsAuthPanel {
  type: "login" | "register"
}

interface PropsLinkPanel {
  text: string
  link: string
}

export interface PropsTextPanel {
  login: string
  register: string
}

export interface PropsTextLinkPanel {
  login: PropsLinkPanel
  register: PropsLinkPanel
}
