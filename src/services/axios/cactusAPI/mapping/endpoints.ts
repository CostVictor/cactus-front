export const sessionEP = {
  login: "session/login/",
  logout: "session/logout/",
  refresh: "session/refresh_token/",
};

export const userEP = {
  register: "user/register/",
};

export const stockSnacksEP = {
  base: "snacks/",
  category: (name: string) => `snacks/${name}/`,
  item: (categoryName: string, itemName: string) => `snacks/${categoryName}/${itemName}/`,
};
