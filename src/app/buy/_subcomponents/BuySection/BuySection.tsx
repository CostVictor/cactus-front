import { PropsBuySection } from "./buysection.types";
import style from "./buysection.module.scss";

const BuySection = ({ children }: PropsBuySection) => {
  return <section className={style.container_main}>{children}</section>;
};

export default BuySection;
