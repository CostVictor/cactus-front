export interface PropsCartItem {
  category: string;
  name: string;
  price: string;
  quantity: number;
  maxQuantity?: number;
  borderDashed?: boolean;
}
