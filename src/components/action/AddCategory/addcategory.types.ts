import { Dispatch, SetStateAction } from "react"
import { PropsCategory } from "@/app/stock/snacks/snacks.types"

export interface PropsAddCategory {
  setData: Dispatch<SetStateAction<PropsCategory[] | null>>
}
