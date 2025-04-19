interface PropsStorageCartItem {
  name: string;
  quantity: number;
}

interface PropsStorageCartCategory {
  [category: string]: PropsStorageCartItem[];
}

export interface PropsStorageCart {
  items: PropsStorageCartCategory | null;
  state: {
    isOpen: boolean;
    toggleIsOpen: () => void;
  },
  actions: {
    editCart: (category: string, name: string, quantity: number) => void;
    clearCart: () => void;
  }
}
