import { Dispatch, SetStateAction } from "react"

export interface PropsSelectionPanel {
  options: string[]
  localValue: string
  setLocalValue: Dispatch<SetStateAction<string>>
}
