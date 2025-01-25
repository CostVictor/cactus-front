import { PropsTextFieldConfig } from "./textfield.types"
import style from "./textfield.module.scss"

export const getClassTextField = (config: PropsTextFieldConfig, isMessageVisible: boolean) =>
  `${style.input} ${config.bgDark ? style.bg_dark : ""} ${isMessageVisible ? style.message_mode : ""
    } ${config.type === "password" ? style.password_mode : ""} ${config.icon ? style.indent : ""
    }`.trim()
