import { PropsFolderConfig } from "../../folder.types"

export interface PropsOptionsControler {
  nameCategory: string
  descriptionCategory?: { title: string, text: string } | null
  isFolderOpen: boolean
  folderConfig: PropsFolderConfig
  toggleOpenFolder: () => void
}
