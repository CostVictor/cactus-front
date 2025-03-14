export const apiHTTP = {
  baseUrl: process.env.BASE_URL_HTTP_API,

  session: {
    login: "session/login/",
    logout: "session/logout/",
    refresh: "session/refresh/"
  },

  user: {
    baseUrl: "user/",
    register: "user/register/"
  },

  snack: {
    baseUrl: "snacks/",
    category: (name: string) => `snacks/${name}/`,
    item: (nameCategory: string, nameSnack: string) => `snacks/${nameCategory}/${nameSnack}/`
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
  baseUrl: process.env.BASE_URL_WS_API,

  snack: {
    baseUrl: "snack/",
  },

  lunch: {
    baseUrl: "lunch/",
  }
}
