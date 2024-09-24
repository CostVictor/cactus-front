import { alatsi } from "@/styles/fonts";
import { PropsButton } from "./button.types";
import style from "./button.module.scss";

const Button = ({
  text,
  appearance = "normal",
  clicked,
  onClick,
}: PropsButton) => {
  const btnClass = `${alatsi.className} ${style.button}${
    appearance === "main" ? ` ${style.main}` : ""
  }${clicked ? ` ${style.clicked}` : ""}`;

  return (
    <button className={btnClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
