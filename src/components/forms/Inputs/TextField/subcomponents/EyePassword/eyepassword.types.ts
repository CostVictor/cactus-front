import { Dispatch, SetStateAction } from "react"

export interface PropsEyePassword {
  isPasswordVisible: boolean
  setIsPasswordVisible: Dispatch<SetStateAction<boolean>>
  isMessageMode: boolean
}
