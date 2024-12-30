import { Dispatch, SetStateAction } from "react"
import { BaseCategory } from "@APISCMapping/snacks.types"

export interface PropsAddCategory {
  setStockSnacks: Dispatch<SetStateAction<BaseCategory[] | null>>
}
