import { ReactNode, MouseEventHandler } from "react"

export interface PropsLabelFolder {
  text: string
  type?: "normal" | "alert" | "success" | "pending"
}

interface PropsExtraOptionsFolder {
  icon: string
  color: "red" | "green" | "normal"
  onClick?: MouseEventHandler<SVGSVGElement>
}

interface PropsNotificationFolder {
  message?: string
  labels?: PropsLabelFolder[]
}


export interface PropsFolderConfig {
  canEdit?: boolean
  canMinimize?: boolean
  expandUntil?: string
  addExtraOptions?: PropsExtraOptionsFolder[]
  marker?: {
    appearance: string
    type: "icon" | "image"
  }
}

export interface PropsFolder {
  name: string
  children: ReactNode
  open?: boolean
  internal?: boolean | number
  notification?: PropsNotificationFolder
  folderConfig?: PropsFolderConfig
}
