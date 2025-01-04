import { alatsi } from "@/styles/fonts";
import { PropsButton } from "./button.types";
import { Icon } from "@iconify/react";
import style from "./button.module.scss";

const Button = ({
  text,
  type,
  clicked,
  noShadow,
  onClick,
  isLoading,
  appearance = "normal",
}: PropsButton) => {
  const btnClass = `${alatsi.className} ${style.button} ${
    appearance !== "normal" && style[appearance]
  } ${clicked && style.clicked} ${isLoading && style.loading}`.trim();

  return (
    <button
      type={type}
      className={btnClass}
      style={{ boxShadow: noShadow ? "none" : undefined }}
      onClick={isLoading ? undefined : onClick}
    >
      {text}
      {isLoading && (
        <Icon icon="svg-spinners:3-dots-move" className={style.icon} />
      )}
    </button>
  );
};

export default Button;
