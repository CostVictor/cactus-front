import { BaseSnack } from "@api/types/snack";

export interface PropsBuyModal {
  cartRef: "cartLunch" | "cartSnack";
  categoryName: string;
  snack: BaseSnack;
}
