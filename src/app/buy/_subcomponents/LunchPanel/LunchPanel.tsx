import { Fragment } from "react";
import useCart from "@/hooks/context/useCart";
import useModalActions from "@/hooks/context/useModal";
import CardInfo from "@/components/display/CardInfo";
import Panel from "@/components/layout/Panel";
import Grid from "@/components/layout/Grid";

import Folder from "@/components/interface/Folder";
import SnackPanel from "../SnackPanel";
import BuyModal from "./subcomponents/BuyModal";
import { BaseIngredient } from "@api/types/lunch";

import { PropsLunchPanel } from "./lunchpanel.types";
import style from "./lunchpanel.module.scss";

const LunchPanel = ({ dish, products }: PropsLunchPanel) => {
  const { lunch } = useCart.cartLunch();
  const { setLunch } = useCart.actions();

  const { addNewModal } = useModalActions();

  return (
    <>
      <Panel title={`Prato de Hoje (${dish.day_name})`}>
        <Grid sizeItem={300} className={style.grid}>
          {dish.ingredients.multiple_choice.map((ingredient) => (
            <CardInfo
              key={ingredient.name}
              title={ingredient.name}
              text={
                ingredient.additional_charge
                  ? `+${ingredient.additional_charge} p/ acr.`
                  : undefined
              }
              markerColor={
                lunch?.items.find((item) => item.name === ingredient.name)
                  ? "var(--red-primary)"
                  : undefined
              }
              onClick={
                ingredient.additional_charge
                  ? () =>
                      addNewModal(
                        <BuyModal
                          dishPrice={dish.price}
                          ingredient={ingredient}
                          choiceNumber={0}
                        />
                      )
                  : () => setLunch(ingredient.name, "--", 1, 0, dish.price)
              }
            />
          ))}
        </Grid>

        {!!dish.ingredients.single_choice && (
          <div className={style.container_choice}>
            {Object.entries(dish.ingredients.single_choice).map(
              ([key, ingredients]: [
                key: string,
                ingredients: BaseIngredient[]
              ]) => (
                <Fragment key={key}>
                  <p className="marker">Escolha única</p>
                  <Grid className={style.grid} sizeItem={300}>
                    {ingredients.map((ingredient) => (
                      <CardInfo
                        key={ingredient.name}
                        title={ingredient.name}
                        text={
                          ingredient.additional_charge
                            ? `+${ingredient.additional_charge} p/ acr.`
                            : undefined
                        }
                        markerColor={
                          lunch?.items.find(
                            (item) => item.name === ingredient.name
                          )
                            ? "var(--red-primary)"
                            : undefined
                        }
                        onClick={
                          ingredient.additional_charge
                            ? () =>
                                addNewModal(
                                  <BuyModal
                                    dishPrice={dish.price}
                                    ingredient={ingredient}
                                    choiceNumber={Number(key)}
                                  />
                                )
                            : () =>
                                setLunch(
                                  ingredient.name,
                                  "--",
                                  1,
                                  Number(key),
                                  dish.price
                                )
                        }
                      />
                    ))}
                  </Grid>
                </Fragment>
              )
            )}
          </div>
        )}
      </Panel>
      <Folder name="Acompanhamentos" config={{ expandUntil: "100rem" }}>
        <SnackPanel cartRef="cartLunch" products={products} bgPanelDark />
      </Folder>
    </>
  );
};

export default LunchPanel;
