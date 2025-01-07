export const baseUrlHttp = "http://192.168.3.102:8000/";
export const baseUrlWs = "ws://192.168.3.102:8000/";

export const sessionEP = {
  base: "session/",
  login: "session/login/",
  logout: "session/logout/",
  refresh: "session/refresh_token/",
};

export const userEP = {
  base: "user/",
  register: "user/register/",
};

export const stockSnackEP = {
  base: "snack/",
  category: (name: string) => `snack/${name}/`,
  item: (categoryName: string, itemName: string) => `snack/${categoryName}/${itemName}/`,
};

export const stockLunchEP = {
  base: "lunch",
  baseIngredient: "lunch/ingredients",
  dish: (name: string) => `lunch/${name}/`,
  ingredient: (name: string) => `lunch/ingredients/${name}/`,
  composition: (dishName: string, ingredientName: string) => `lunch/${dishName}/${ingredientName}/`,
};
