import { Dispatch, SetStateAction } from "react"
import { PropsSnack } from "../Snack"

export interface PropsAddItem {
  nameCategory: string
  setSnacksList: Dispatch<SetStateAction<PropsSnack[]>>
}
