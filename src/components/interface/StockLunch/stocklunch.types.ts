import { BaseIngredient, BaseDish } from "@APISCMapping/lunch.types"

export interface StockLunchProps {
  ingredients: BaseIngredient[]
  dishes: BaseDish[]
}
