import { daysWeek } from "@api/variables"

export interface BaseIngredient {
  name: string
  additional_charge: string | null
}

export interface BaseIngredients {
  multiple_choice: BaseIngredient[]
  single_choice?: { [key: number]: BaseIngredient[] }
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
