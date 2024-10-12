import { Icon } from "@iconify/react";
import { PropsEyePassword } from "./eyepassword.types";
import style from "./eyepassword.module.scss";

const EyePassword = ({
  isValueVisible,
  setValueVisible,
  isMessageMode,
}: PropsEyePassword) => {
  const toggleValueVisible = () =>
    setValueVisible((prevVisible) => !prevVisible);

  return (
    <div
      className={`${style.container} ${
        isMessageMode ? style.message_mode : ""
      }`.trim()}
      onClick={toggleValueVisible}
    >
      <Icon
        className={style.icon}
        icon={isValueVisible ? "ph:eye-closed-bold" : "ph:eye-bold"}
      />
    </div>
  );
};

export default EyePassword;
