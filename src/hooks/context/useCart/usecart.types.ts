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
  stockLunch: {
    lunch: PropsStorageCartCategory | null;
    snack: PropsStorageCartSnacks | null;
  },
  stockSnack: {
    lunch: null;
    snack: PropsStorageCartSnacks | null;
  }
  actions: {
    getTotalPrice: (stock: "stockLunch" | "stockSnack") => string;
    setLunch: (name: string, price: string, quantity: number) => void;
    setSnack: (stock: "stockLunch" | "stockSnack", category: string, name: string, price: string, quantity: number) => void;
    clearCart: (stock: "stockLunch" | "stockSnack") => void;
  }
}
