import { Dispatch, SetStateAction } from "react"
import { BaseSnack } from "@APISCMapping/snacks.types"

export interface PropsAddItem {
  nameCategory: string
  setSnacksList: Dispatch<SetStateAction<BaseSnack[]>>
}
