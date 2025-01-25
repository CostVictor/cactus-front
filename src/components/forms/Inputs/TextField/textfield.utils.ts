import { PropsTextFieldType } from "./textfield.types"
import style from "./textfield.module.scss"

export const getClassTextField = (type: PropsTextFieldType, isMessageVisible: boolean, icon?: string) =>
  `${style.input} ${isMessageVisible ? style.message_mode : ""
    } ${type === "password" ? style.password_mode : ""} ${icon ? style.indent : ""
    }`.trim()
