import { PropsButton } from "@/components/form/Button"
import { BaseCategory } from "@api/types/snack";
import { TodayLunchWithProducts } from "@api/types/lunch";


export interface PropsCart {
  cartRef: "cartLunch" | "cartSnack";
  stock: BaseCategory[] | TodayLunchWithProducts;
  buttons: PropsButton[];
}
