import { BaseSnack } from "@api/types/snack";

export interface PropsBuySnackModal {
  cartRef: "cartLunch" | "cartSnack";
  categoryName: string;
  snack: BaseSnack;
}
