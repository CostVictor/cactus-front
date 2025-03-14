export interface BaseSnack {
  name: string;
  quantity_in_stock: number;
  price: string;
  description: string | null;
  path_img: string | null;
  category?: string;
}

export interface BaseCategory {
  name: string;
  path_img: string | null;
  position_order?: number;
  description?: {
    title: string;
    text: string;
    illustration_url: string | null;
    category?: string;
  };
  snacks: BaseSnack[];
}
