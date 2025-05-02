interface PropsStorageCartItem {
  name: string;
  quantity: number;
  price: string | null;
}

interface PropsStorageCartCategory {
  basePrice: string | null;
  items: PropsStorageCartItem[]
}

interface PropsStorageCartSnacks {
  [category: string]: PropsStorageCartCategory
}

export interface PropsStorageCart {
  state: {
    lunch: PropsStorageCartCategory | null;
    snack: PropsStorageCartSnacks | null;
  }
  actions: {
    getTotalPrice: () => string;
    setLunch: (name: string, price: string, quantity: number) => void;
    setSnack: (category: string, name: string, price: string, quantity: number) => void;
    clearCart: () => void;
  }
}
