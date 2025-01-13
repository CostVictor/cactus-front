"use client";

import useWebSocket from "@/hooks/network/useWebSocket";
import { stockLunchEP } from "@APISCMapping/endpoints";
import ItemInfo from "@/components/display/ItemInfo";

const StockLunch = () => {
  const { data, isLoading } = useWebSocket(stockLunchEP.base);

  return <div>Show</div>;
};

export default StockLunch;
