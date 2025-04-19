import StorageCart from "./usecart.storage";

export const useCartState = () => StorageCart((storage) => storage.state);
export const useCartActions = () => StorageCart((storage) => storage.actions);

const useCart = () => StorageCart((storage) => storage.items);

export default useCart;
