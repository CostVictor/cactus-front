interface Price {
  formatted_amount: string;
  amount: number;
}

export interface BuySnack {
  name: string;
  quantity_product: number;
  price_to_purchase: string;
}

export interface BuyLunch {
  dish_name: string;
  ingredient_name: string;
  price_to_purchase_dish: string;
  price_to_purchase_ingredient: string;
  quantity_ingredient: number;
}

export interface BaseOrder {
  public_id: string;
  user: string;
  creator_user: string;
  creation_date: string;
  final_payment_date: string | null;
  amount_due: Price;
  amount_snacks: Price;
  amount_lunche: Price;
  fulfilled: boolean;
  hidden: boolean;
  description: string;
  snacks: BuySnack[];
  lunch: BuyLunch[];
}
