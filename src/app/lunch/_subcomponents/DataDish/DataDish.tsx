import { Fragment } from "react";
import { useRouter } from "next/navigation";

import Grid from "@/components/layout/Grid";
import CardInfo from "@/components/display/CardInfo";
import Button from "@/components/form/Button";
import { BaseIngredient } from "@api/types/lunch";

import { PropsDataDish } from "./datadish.types";
import style from "./datadish.module.scss";

const DataDish = ({ dish, canRedirect }: PropsDataDish) => {
  const router = useRouter();

  return (
    <div className={style.container_main}>
      <span>
        <p>Preço do prato:</p>
        <p className={style.value}>{dish.price}</p>
      </span>

      <span>
        <p>Horário de aceitação de pedidos:</p>
        <p className={style.value}>
          das {dish.initial_deadline || "00:00"} até às{" "}
          {dish.deadline || "23:59"} horas.
        </p>
      </span>

      <Grid sizeItem={300}>
        {dish.ingredients.multiple_choice.map((ingredient) => (
          <CardInfo
            key={ingredient.name}
            title={ingredient.name}
            text={
              ingredient.additional_charge
                ? `+${ingredient.additional_charge} p/ acr.`
                : undefined
            }
          />
        ))}
      </Grid>

      {Object.entries(dish.ingredients.single_choice ?? {}).map(
        ([key, value]) => (
          <Fragment key={key}>
            <p className="marker">Escolha única</p>

            <Grid sizeItem={300}>
              {value.map((ingredient: BaseIngredient) => (
                <CardInfo
                  key={ingredient.name}
                  title={ingredient.name}
                  text={
                    ingredient.additional_charge
                      ? `+${ingredient.additional_charge} p/ acr.`
                      : undefined
                  }
                />
              ))}
            </Grid>
          </Fragment>
        )
      )}

      {canRedirect && (
        <>
          <p className="marker"></p>

          <div className={style.container_redirect}>
            <Button
              text="Solicitar almoço"
              appearance="principal"
              onClick={() => router.push("/buy/lunch")}
              largeMode
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DataDish;
