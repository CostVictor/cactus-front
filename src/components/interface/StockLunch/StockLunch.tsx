"use client";

import { useMemo } from "react";

import Folder from "../Folder";
import useWebSocket from "@/hooks/network/useWebSocket";
import useModalActions from "@/hooks/context/useModal";

import IngredientPanel from "./subcomponents/IngredientPanel";
import DishPanel from "./subcomponents/DishPanel";
import { StockLunchProps } from "./stocklunch.types";

import { apiWS } from "@api/endpoints";
import EditDish from "./subcomponents/EditDish";
import style from "./stocklunch.module.scss";

const StockLunch = () => {
  const { addNewModal } = useModalActions();

  const { lunch } = apiWS;
  const { data, isLoading } = useWebSocket<StockLunchProps>(lunch.baseUrl);

  const allIngredientsName = useMemo(
    () => data?.ingredients.map((ingredient) => ingredient.name) ?? [],
    [data]
  );

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
                edit: () => addNewModal(<EditDish dish={dish} />),
              }}
            >
              <DishPanel dish={dish} allIngredientsName={allIngredientsName} />
            </Folder>
          ))}
      </div>
    </>
  );
};

export default StockLunch;
