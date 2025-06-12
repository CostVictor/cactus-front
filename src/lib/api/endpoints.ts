export const apiHTTP = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL_HTTP,

  session: {
    login: "session/login/",
    logout: "session/logout/",
    refresh: "session/refresh_token/"
  },

  user: {
    baseUrl: "user/",
    register: "user/register/",
    allUsers: "user/all/",

    user: (username: string) => `user/${username}/`
  },

  snack: {
    baseUrl: "snack/",
    category: (name: string) => `snack/${name}/`,
    item: (nameCategory: string, nameSnack: string) => `snack/${nameCategory}/${nameSnack}/`
  },

  lunch: {
    baseUrl: "lunch/",
    baseIngredients: "lunch/ingredients/",

    today: (withProducts: boolean) => `lunch/today/?with_products=${withProducts}`,
    dish: (name: string) => `lunch/${name}/`,
    composition: (nameDish: string, nameIngredient: string) => `lunch/${nameDish}/${nameIngredient}/`,
    ingredient: (name: string) => `lunch/ingredients/${name}/`
  },

  order: {
    baseUrl: "order/",

    record: (publicId: string) => `order/${publicId}/`,
    recordAsPaid: (publicId: string) => `order/${publicId}/paid`,
    recordAsFulfilled: (publicId: string) => `order/${publicId}/fulfilled`
  }
}


export const apiWS = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL_WS,

  snack: {
    baseUrl: "ws/snack/",
  },

  lunch: {
    baseUrl: "ws/lunch/",
  },

  order: {
    baseUrlSnack: "ws/order/snack/",
    baseUrlLunch: "ws/order/lunch/"
  }
}
