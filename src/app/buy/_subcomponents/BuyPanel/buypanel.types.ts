import { TodayLunchWithProducts } from "@api/types/lunch";

export type PropsBuyPanel = Omit<TodayLunchWithProducts, "dish"> & Partial<Pick<TodayLunchWithProducts, "dish">>;
