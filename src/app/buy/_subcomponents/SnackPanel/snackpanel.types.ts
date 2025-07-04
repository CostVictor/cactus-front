import { BaseCategory } from "@api/types/snack"

export interface PropsSnackPanel {
  cartRef: "cartLunch" | "cartSnack"
  products: BaseCategory[]
  bgPanelDark?: boolean
}
