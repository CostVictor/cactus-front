export const baseUrlHttp = "http://192.168.3.102:8000/";
export const baseUrlWs = "ws://192.168.3.102:8000/";

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
