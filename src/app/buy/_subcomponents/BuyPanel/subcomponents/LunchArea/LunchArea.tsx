import Button from "@/components/form/Button";
import Grid from "@/components/layout/Grid";
import Panel from "@/components/layout/Panel";
import useCart from "@/hooks/context/useCart";

import { BaseIngredient } from "@api/types/lunch";

import { PropsLunchArea } from "./luncharea.types";
import style from "./luncharea.module.scss";

const LunchArea = ({ dish }: PropsLunchArea) => {
  const { lunch } = useCart.cartLunch();
  const { setLunch } = useCart.actions();

  return (
    <>
      <Panel title={`Almoço de Hoje (${dish.day_name})`}>
        <Grid className={style.grid}>
          {dish.ingredients.multiple_choice.map((ingredient) => (
            <Button
              key={ingredient.name}
              text={ingredient.name}
              type="button"
              appearance={
                lunch?.items.filter((item) => item.name === ingredient.name)
                  .length
                  ? "principal"
                  : "default"
              }
              onClick={() =>
                setLunch(
                  ingredient.name,
                  ingredient.additional_charge || "--",
                  1,
                  0,
                  dish.price
                )
              }
            />
          ))}
        </Grid>
      </Panel>

      {Object.entries(dish.ingredients.single_choice ?? {}).map(
        ([key, value]) => {
          const ingredients = value as BaseIngredient[];

          return (
            <Panel key={key} title="Escolha uma Opção">
              <Grid className={style.grid}>
                {ingredients.map((ingredient) => (
                  <Button
                    key={ingredient.name}
                    text={ingredient.name}
                    type="button"
                    appearance={
                      lunch?.items.filter(
                        (item) => item.name === ingredient.name
                      ).length
                        ? "principal"
                        : "default"
                    }
                    onClick={() =>
                      setLunch(
                        ingredient.name,
                        ingredient.additional_charge || "--",
                        1,
                        Number(key),
                        dish.price
                      )
                    }
                  />
                ))}
              </Grid>
            </Panel>
          );
        }
      )}
    </>
  );
};

export default LunchArea;
