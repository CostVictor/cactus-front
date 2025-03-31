import { PropsFolderConfig } from "../../folder.types"

export interface PropsOptionsControler {
  isFolderOpen: boolean
  folderConfig: PropsFolderConfig
  toggleOpenFolder: () => void
}
