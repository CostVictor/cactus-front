import StorageCart from "./usecart.storage";

export const useCartActions = () => StorageCart((storage) => storage.actions);
const useCart = () => StorageCart((storage) => storage.state);

export default useCart;
