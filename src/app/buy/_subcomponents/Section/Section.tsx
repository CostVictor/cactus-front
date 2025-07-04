import { PropsSection } from "./section.types";
import style from "./section.module.scss";

const Section = ({ children }: PropsSection) => {
  return <section className={style.container_main}>{children}</section>;
};

export default Section;
