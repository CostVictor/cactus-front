import { Dispatch, SetStateAction } from "react"

export interface PropsEyePassword {
  isValueVisible: boolean
  setValueVisible: Dispatch<SetStateAction<boolean>>
  isMessageMode: boolean
}
