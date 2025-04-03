import { BaseIngredientsSingleChoice } from "@api/types/lunch";

export interface PropsEditComposition {
  dayName: string;
  ingredientName: string;
  quantityFieldSingleChoice: number;
  currentChoiceNumber: number;
}
