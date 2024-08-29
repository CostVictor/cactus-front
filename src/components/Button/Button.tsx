import { CSSProperties, MouseEventHandler } from "react";
import { alatsi } from "@/styles/fonts";
import style from "./button.module.scss";
import Link from "next/link";

interface Button {
  text: string;
  font?: string;
  aparence?: "normal" | "main" | "link" | "target-link";
  clicked?: boolean;
  cssStyle?: CSSProperties;
  onClick?: MouseEventHandler;
  link?: string;
}

const Button = ({
  text,
  font = alatsi.className,
  aparence = "normal",
  clicked,
  cssStyle,
  onClick,
  link = "",
}: Button) => {
  const btnClass =
    `${font} ${style.button}` +
    (clicked ? ` ${style.clicked}` : "") +
    (aparence !== "normal" ? ` ${style[aparence]}` : "");

  return link ? (
    <Link style={cssStyle} className={btnClass} href={link}>
      {text}
    </Link>
  ) : (
    <button onClick={onClick} style={cssStyle} className={btnClass}>
      {text}
    </button>
  );
};

export default Button;
