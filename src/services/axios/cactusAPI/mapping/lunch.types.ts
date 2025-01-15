export interface BaseIngredient {
  name: string
  additional_charge: string | null
}

export interface BaseDish {
  day_name: "Segunda" | "Terça" | "Quarta" | "Quinta" | "Sexta"
  price: string
  initial_deadline: string | null
  deadline: string | null
  description: string | null
  path_img: string | null
  ingredients: {
    multiple_choice: BaseIngredient[]
    single_choice?: { [key: number]: BaseIngredient[] }
  }
}

export interface BaseComposition {
  config_choice_number: number
}
