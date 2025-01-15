import { BaseSnack } from "@/services/axios/cactusAPI/mapping/snack.types";

export interface PropsSnackPanel {
  nameCategory: string
  snacks: BaseSnack[]
}
