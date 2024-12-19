import { PropsSnack } from "@/components/interface/SnackPanel/subcomponents/Snack";

export interface PropsCategory {
  name: string
  description: { title: string, text: string } | null
  position_order: number
  path_img: string | null
  snacks: PropsSnack[]
}
