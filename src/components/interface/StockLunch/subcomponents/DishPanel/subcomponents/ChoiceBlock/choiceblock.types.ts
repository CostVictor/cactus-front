import { BaseIngredient } from "@api/types/lunch"

export interface PropsChoiceBlock {
  dayName: string
  ingredients: BaseIngredient[]
  optionsToAdd: string[]
  choiceNumber: number
  quantityFieldSingleChoice: number
}
