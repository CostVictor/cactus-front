import { useState } from "react";

import useModalActions from "@/hooks/context/useModal";

import Grid from "@/components/layout/Grid";
import Panel from "@/components/layout/Panel";

import CardInfo from "@/components/display/CardInfo";
import Button from "@/components/form/Button";

import BuySnackModal from "../BuySnackModal";

import LunchArea from "./subcomponents/LunchArea";

import { PropsBuyPanel } from "./buypanel.types";
import style from "./buypanel.module.scss";

const BuyPanel = ({ dish, products }: PropsBuyPanel) => {
  const { addNewModal } = useModalActions();

  const categories = products.map((category) => category.name);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  return (
    <>
      {!!dish && <LunchArea dish={dish} />}

      <Panel title="Categorias de Itens">
        <Grid sizeItem={180} className={style.grid_buttons}>
          {categories.map((categoryName, index) => (
            <Button
              key={index}
              text={categoryName}
              appearance={
                categoryName === currentCategory ? "principal" : "default"
              }
              onClick={() => setCurrentCategory(categoryName)}
              type="button"
            />
          ))}
        </Grid>
      </Panel>

      <p className="division"></p>

      <Grid sizeItem={220}>
        {products
          .find((category) => category.name === currentCategory)
          ?.snacks.map((snack, index) => (
            <CardInfo
              key={index}
              title={snack.name}
              text={snack.price}
              onClick={() =>
                addNewModal(
                  <BuySnackModal
                    cartRef={!!dish ? "cartLunch" : "cartSnack"}
                    categoryName={currentCategory}
                    snack={snack}
                  />
                )
              }
            />
          ))}
      </Grid>
    </>
  );
};

export default BuyPanel;
