import StorageCart from "./usecart.storage";

const cartLunch = () => StorageCart((storage) => storage.cartLunch);
const cartSnack = () => StorageCart((storage) => storage.cartSnack);
const actions = () => StorageCart((storage) => storage.actions);

const useCart = {
  cartLunch,
  cartSnack,
  actions,
};

export default useCart;
