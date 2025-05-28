import { BaseSnack } from "@api/types/snack";

export interface PropsBuyModal {
  categoryName: string;
  snack: BaseSnack;
  setQuantity?: boolean;
}
