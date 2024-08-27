import { CSSProperties, MouseEventHandler } from "react";
import { alatsi } from "@/styles/fonts";
import style from "./button.module.scss";
import Link from "next/link";

interface propButton {
  text: string;
  textFont?: string;
  btnAparence?: "normal" | "main" | "url" | "target-url";
  clicked?: boolean;
  cssStyle?: CSSProperties;
  onClick?: MouseEventHandler;
  url?: string;
}

const Button = ({
  text,
  textFont = alatsi.className,
  btnAparence = "normal",
  clicked,
  cssStyle,
  onClick,
  url = "",
}: propButton) => {
  const btnClass =
    `${textFont} ${style.button}` +
    (clicked ? ` ${style.clicked}` : "") +
    (btnAparence !== "normal" ? ` ${style[btnAparence]}` : "");

  return url ? (
    <Link style={cssStyle} className={btnClass} href={url}>
      {text}
    </Link>
  ) : (
    <button onClick={onClick} style={cssStyle} className={btnClass}>
      {text}
    </button>
  );
};

export default Button;
