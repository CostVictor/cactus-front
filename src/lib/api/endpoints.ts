export const apiHTTP = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL_HTTP,

  session: {
    login: "session/login/",
    logout: "session/logout/",
    refresh: "session/refresh_token/"
  },

  user: {
    baseUrl: "user/",
    register: "user/register/"
  },

  snack: {
    baseUrl: "snack/",
    category: (name: string) => `snack/${name}/`,
    item: (nameCategory: string, nameSnack: string) => `snack/${nameCategory}/${nameSnack}/`
  },

  lunch: {
    baseUrl: "lunch/",
    baseIngredients: "lunch/ingredients/",

    dish: (name: string) => `lunch/${name}/`,
    composition: (nameDish: string, nameIngredient: string) => `lunch/${nameDish}/${nameIngredient}/`,
    ingredient: (name: string) => `lunch/ingredients/${name}/`
  }
}


export const apiWS = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL_WS,

  snack: {
    baseUrl: "snack/",
  },

  lunch: {
    baseUrl: "lunch/",
  }
}
