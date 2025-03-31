interface PropsMenuItem {
  name: string
  icon: string
  url: string
  urlAlias?: string
  requiresAuth?: boolean
}

interface PropsSidebarSession {
  items: PropsMenuItem[]
  requiresAuth?: boolean
  access?: "employee"
}

export type PropsListSidebarItems = PropsSidebarSession[]
