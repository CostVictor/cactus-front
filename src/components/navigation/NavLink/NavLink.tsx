import { averiaSansLibre } from "@/styles/fonts";
import { PropsLink } from "./navlink.types";
import style from "./navlink.module.scss";
import Link from "next/link";

const NavLink = ({ text, link, onClick }: PropsLink) => {
  const linkClass = `${averiaSansLibre.className} ${style.link} ${
    link.includes("#") ? style.target : ""
  }`.trim();

  return (
    <Link className={linkClass} href={link} onClick={onClick}>
      {text}
    </Link>
  );
};

export default NavLink;
