"use client";

import useWebSocket from "@/hooks/network/useWebSocket";
import { stockLunchEP } from "@APISCMapping/endpoints";

import { StockLunchProps } from "./stocklunch.types";
import IngredientPanel from "./subcomponents/IngredientPanel";

const StockLunch = () => {
  const { data, isLoading } = useWebSocket<StockLunchProps>(stockLunchEP.base);

  return (
    <>
      <IngredientPanel
        ingredients={data?.ingredients ?? []}
        isLoading={isLoading}
      />
    </>
  );
};

export default StockLunch;
