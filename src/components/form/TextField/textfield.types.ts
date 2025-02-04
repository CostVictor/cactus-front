import { PropsBaseInput, PropsBaseInputTypes } from "../_shared/BaseInput";
import { PropsMessage } from "../_shared/_subcomponents/Message";

export type PropsTextField = Omit<PropsBaseInput, "type"> & {
  type?: Exclude<PropsBaseInputTypes, "tel" | "datetime-local" | "search" | "image" | "price">
  message?: PropsMessage
}
