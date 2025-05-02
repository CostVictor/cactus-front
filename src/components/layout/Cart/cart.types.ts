import { PropsButton } from "@/components/form/Button"
import { BaseCategory } from "@api/types/snack";
import { BaseDish } from "@api/types/lunch";

interface PropsStockCartLunch {
  dish: BaseDish;
  products: BaseCategory[];
}

export interface PropsCart {
  stock: BaseCategory[] | PropsStockCartLunch;
  buttons: PropsButton[];
}
