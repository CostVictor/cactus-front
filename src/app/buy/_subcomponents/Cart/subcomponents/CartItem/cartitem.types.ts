export interface PropsCartItem {
  cartRef: "cartLunch" | "cartSnack";
  category: string;
  name: string;
  price: string;
  quantity: number;
  maxQuantity?: number;
  borderDashed?: boolean;
  choiceNumber?: number;
  dishPrice?: string;
}
