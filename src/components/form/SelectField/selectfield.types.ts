import { PropsBaseInput } from "../_shared/BaseInput";

export type PropsSelectField = Omit<PropsBaseInput, "type"> & {
  options: string[]
  message?: string
}
