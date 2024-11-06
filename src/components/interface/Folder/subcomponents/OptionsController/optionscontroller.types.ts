import { PropsFolderConfig } from "../../folder.types"

export interface PropsOptionsControler {
  isOpen: boolean
  config: PropsFolderConfig
  toggleOpenFolder: () => void
}
