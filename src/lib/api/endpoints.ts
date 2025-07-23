export const http = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL_HTTP,

  session: {
    login: "session/login",
    logout: "session/logout",
    refresh: "session/refresh_token",
  },

  user: {
    baseUrl: "user/",
    register: "user/register",
    allUsers: "user/all",

    user: (username: string) => `user/n/${username}`,
  },

  snack: {
    baseUrl: "snack/",

    category: (name: string) => `snack/c/${name}`,
    item: (nameCategory: string, nameSnack: string) =>
      `snack/c/${nameCategory}/${nameSnack}`,
  },

  lunch: {
    baseUrl: "lunch/",
    baseIngredients: "lunch/i",

    today: (withProducts: boolean) =>
      `lunch/today?with_products=${withProducts}`,
    dish: (name: string) => `lunch/d/${name}`,
    composition: (nameDish: string, nameIngredient: string) =>
      `lunch/d/${nameDish}/${nameIngredient}`,
    ingredient: (name: string) => `lunch/i/${name}`,
  },

  order: {
    baseUrl: "order/",

    record: (publicId: string) => `order/r/${publicId}`,
    recordAsPaid: (publicId: string) => `order/r/${publicId}/paid`,
    recordAsFulfilled: (publicId: string) => `order/r/${publicId}/fulfilled`,
  },
};

export const ws = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL_WS,

  snack: {
    baseUrl: "ws/snack",
  },

  lunch: {
    baseUrl: "ws/lunch",
  },

  order: {
    baseUrlSnack: "ws/order/snack",
    baseUrlLunch: "ws/order/lunch",
  },
};
