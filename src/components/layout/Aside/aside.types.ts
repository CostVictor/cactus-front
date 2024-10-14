interface PropsMenuItem {
  name: string
  icon: string
  url: string
  requiresAuth?: boolean
}

interface PropsAsideSession {
  items: PropsMenuItem[]
  requiresAuth?: boolean
  access?: "employee"
}

export type PropsListAsideItems = PropsAsideSession[]
