import { ReactNode } from "react"

export interface PropsLabelFolder {
  text: string
  type?: "normal" | "alert" | "success" | "pending"
}

interface PropsNotificationFolder {
  message?: string
  labels?: PropsLabelFolder[]
}

export interface PropsFolderConfig {
  canMinimize?: boolean,
  expandUntil?: string
}

export interface PropsFolder {
  name: string
  children: ReactNode
  open?: boolean
  internal?: boolean
  notification?: PropsNotificationFolder
  folderConfig?: PropsFolderConfig
}
