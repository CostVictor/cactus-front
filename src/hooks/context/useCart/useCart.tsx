import StorageCart from "./usecart.storage";

export const useCartActions = () => StorageCart((storage) => storage.actions);
export const useCartLunch = () => StorageCart((storage) => storage.stockLunch);
export const useCartSnack = () => StorageCart((storage) => storage.stockSnack);
