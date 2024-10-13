import { alatsi } from "@/styles/fonts";
import { PropsButton } from "./button.types";
import style from "./button.module.scss";

const Button = ({
  text,
  type,
  appearance = "normal",
  clicked,
  onClick,
}: PropsButton) => {
  const btnClass = `${alatsi.className} ${style.button} ${
    appearance !== "normal" ? style[appearance] : ""
  } ${clicked ? style.clicked : ""}`.trim();

  return (
    <button type={type} className={btnClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
