import clsx from "clsx";

import { PropsPanel } from "./panel.types";
import style from "./panel.module.scss";

const Panel = ({ children, title, bgDark }: PropsPanel) => {
  return (
    <div className={clsx(style.container_main, { [style.bg_dark]: bgDark })}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};

export default Panel;
