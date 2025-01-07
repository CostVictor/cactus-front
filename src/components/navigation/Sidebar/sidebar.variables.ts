import { PropsListSidebarItems } from "./sidebar.types";

/**
 * Representa os itens e sessões do menu lateral do sidebar.
 * 
 * @typedef {Object} PropsMenuItem
 * @property {string} name - O nome exibido para o item no menu.
 * @property {string} icon - A classe do ícone que será exibido ao lado do nome.
 * @property {string} url - A rota para onde o item direciona quando clicado.
 * @property {boolean} [requiresAuth] - (Opcional) Indica se o item requer autenticação.
 * 
 * Representa uma seção do menu lateral.
 * 
 * @typedef {Object} PropsSidebarSession
 * @property {PropsMenuItem[]} items - A lista de itens que pertencem a esta seção.
 * @property {boolean} [requiresAuth] - (Opcional) Indica se toda a seção requer autenticação.
 * @property {"employee"} [access] - (Opcional) Define o tipo de usuário que tem acesso à seção. Exemplo: "employee".
 * 
 * @type {PropsListSidebarItems} listSidebarItems
 * 
 * @description
 * - `listSidebarItems` é um array que contém as seções do menu lateral.
 * - Cada seção é representada por um objeto que possui uma lista de `items` (itens do menu), que seguem a estrutura definida por `PropsMenuItem`.
 * - A propriedade `requiresAuth`, quando presente, indica que o item ou a seção requer autenticação para estar visivel no menu lateral do sidebar.
 * - A propriedade `access` define o tipo de usuário que pode acessar essa seção, caso aplicável.
 */
export const listSidebarItems: PropsListSidebarItems = [
  {
    items: [
      { name: "Perfil", icon: "lucide:user-round", url: "/profile" },
      { name: "Histórico", icon: "majesticons:clipboard-list-line", url: "/history", requiresAuth: true }
    ]
  },
  {
    items: [
      { name: "Início", icon: "fluent:home-16-regular", url: "/" },
      { name: "Almoço", icon: "fluent:food-16-regular", url: "/lunch" },
    ]
  },
  {
    items: [
      { name: "Pedidos", icon: "ep:dish-dot", url: "/orders" },
      { name: "Estatística", icon: "mage:chart-b", url: "/statistic" },
    ], requiresAuth: true, access: "employee"
  },
  { items: [{ name: "Estoque", icon: "tabler:folder", url: "/stock/snacks", urlAlias: "/stock" }], requiresAuth: true, access: "employee" },
];
