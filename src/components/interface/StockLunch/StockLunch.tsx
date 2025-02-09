"use client";

import Folder from "../Folder";
import useWebSocket from "@/hooks/network/useWebSocket";
import useModalActions from "@/hooks/context/useModal";

import IngredientPanel from "./subcomponents/IngredientPanel";
import DishPanel from "./subcomponents/DishPanel";
import { StockLunchProps } from "./stocklunch.types";

import { stockLunchEP } from "@APISCMapping/endpoints";
import style from "./stocklunch.module.scss";

const StockLunch = () => {
  const { data, isLoading } = useWebSocket<StockLunchProps>(stockLunchEP.base);
  const { addNewModal } = useModalActions();

  return (
    <>
      <IngredientPanel
        ingredients={data?.ingredients ?? []}
        isLoading={isLoading}
      />
      <div className={style.container_dishes}>
        {data &&
          data.dishes.map((dish) => (
            <Folder
              key={`dish-${dish.day_name}`}
              name={`Prato de ${dish.day_name}`}
              config={{
                marker: {
                  appearance: "mingcute:storage-fill",
                  type: "icon",
                },
              }}
            >
              <DishPanel
                dish={dish}
                allIngredientsName={data.ingredients.map(
                  (ingredient) => ingredient.name
                )}
              />
            </Folder>
          ))}
      </div>
    </>
  );
};

export default StockLunch;
