import { daysWeek } from "@api/variables"
import { BaseCategory } from "./snack"

export interface BaseIngredient {
  name: string
  additional_charge: string | null
}

export interface BaseIngredientsSingleChoice {
  [key: number]: BaseIngredient[]

}

export interface BaseIngredients {
  multiple_choice: BaseIngredient[]
  single_choice?: BaseIngredientsSingleChoice
}

export interface BaseDish {
  day_name: typeof daysWeek[number]
  price: string
  initial_deadline: string | null
  deadline: string | null
  description: string | null
  path_img: string | null
  ingredients: BaseIngredients
}

export interface BaseComposition {
  config_choice_number: number
}

export interface TodayLunchWithProducts {
  dish: BaseDish,
  products: BaseCategory[]
}
