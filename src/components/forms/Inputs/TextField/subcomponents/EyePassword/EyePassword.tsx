import { Icon } from "@iconify/react";
import { PropsEyePassword } from "./eyepassword.types";
import style from "./eyepassword.module.scss";

const EyePassword = ({
  isPasswordVisible,
  setIsPasswordVisible,
  isMessageMode,
}: PropsEyePassword) => {
  const toggleValueVisible = () =>
    setIsPasswordVisible((prevVisible) => !prevVisible);

  return (
    <div
      className={`${style.container} ${
        isMessageMode ? style.message_mode : ""
      }`.trim()}
      onClick={toggleValueVisible}
    >
      <Icon
        className={style.icon}
        icon={isPasswordVisible ? "ph:eye-closed-bold" : "ph:eye-bold"}
      />
    </div>
  );
};

export default EyePassword;
