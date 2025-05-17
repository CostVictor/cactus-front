interface PropsStorageCartSubmitItem {
  name: string;
  quantity: number;
}

interface PropsStorageCartSubmitSnack {
  [category: string]: PropsStorageCartSubmitItem[]
}

export interface PropsStorageCartSubmit {
  lunch: PropsStorageCartSubmitItem[];
  snack: PropsStorageCartSubmitSnack;
}

interface PropsStorageCartItem {
  name: string;
  quantity: number;
  price: string;
}

interface PropsStorageCartCategory {
  basePrice: string | null;
  items: PropsStorageCartItem[]
}

interface PropsStorageCartSnacks {
  [category: string]: PropsStorageCartCategory
}

export interface PropsStorageCart {
  cartLunch: {
    lunch: PropsStorageCartCategory | null;
    snack: PropsStorageCartSnacks | null;
  },
  cartSnack: {
    lunch: null;
    snack: PropsStorageCartSnacks | null;
  }
  actions: {
    getTotalPrice: (ref: "cartLunch" | "cartSnack") => string;
    getQuantity: (ref: "cartLunch" | "cartSnack") => number;
    getCart: (ref: "cartLunch" | "cartSnack") => PropsStorageCartSubmit;
    setLunch: (name: string, price: string, quantity: number) => void;
    setSnack: (ref: "cartLunch" | "cartSnack", category: string, name: string, price: string, quantity: number) => void;
    clearCart: (ref: "cartLunch" | "cartSnack") => void;
  }
}
