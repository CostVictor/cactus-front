import { useState } from "react";

import useModalActions from "@/hooks/context/useModal";

import Grid from "@/components/layout/Grid";
import Panel from "@/components/layout/Panel";

import CardInfo from "@/components/display/CardInfo";
import Button from "@/components/form/Button";

import BuyModal from "./subcomponents/BuyModal";

import { PropsSnackPanel } from "./snackpanel.types";
import style from "./snackpanel.module.scss";

const SnackPanel = ({ cartRef, products, bgPanelDark }: PropsSnackPanel) => {
  const { addNewModal } = useModalActions();

  const categories = products.map((category) => category.name);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  return (
    <>
      <Panel title="Categorias de Itens" bgDark={bgPanelDark}>
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
              isSoldOut={snack.quantity_in_stock === 0}
              onClick={
                snack.quantity_in_stock > 0
                  ? () =>
                      addNewModal(
                        <BuyModal
                          cartRef={cartRef}
                          categoryName={currentCategory}
                          snack={snack}
                        />
                      )
                  : undefined
              }
            />
          ))}
      </Grid>
    </>
  );
};

export default SnackPanel;
