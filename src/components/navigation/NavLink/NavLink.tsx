import Link from "next/link";
import clsx from "clsx";

import { averiaSansLibre } from "@/styles/fonts";
import { PropsLink } from "./navlink.types";
import style from "./navlink.module.scss";

const NavLink = ({ text, link, onClick }: PropsLink) => {
  const linkClass = clsx(averiaSansLibre.className, style.link, {
    [style.target]: link.includes("#"),
  });

  return (
    <Link className={linkClass} href={link} onClick={onClick}>
      {text}
    </Link>
  );
};

export default NavLink;
