import { PropsBaseInput, PropsBaseInputTypes } from "../_shared/BaseInput";

export type PropsTextField = Omit<PropsBaseInput, "type"> & {
  type?: Exclude<PropsBaseInputTypes, "tel" | "datetime-local" | "search" | "image" | "price">
  message?: string
}
