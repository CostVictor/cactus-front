import { BaseDish, BaseIngredient } from "@api/types/lunch"

export interface StockLunchProps {
  ingredients: BaseIngredient[]
  dishes: BaseDish[]
}
