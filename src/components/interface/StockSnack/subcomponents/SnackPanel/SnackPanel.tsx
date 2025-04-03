"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

import Snack from "./subcomponents/Snack";
import AddItem from "./subcomponents/AddItem";
import useModalActions from "@/hooks/context/useModal";
import EditItem from "./subcomponents/EditItem";
import Grid from "@/components/layout/Grid";
import FilterField from "@/components/form/FilterField";

import { averiaSansLibre } from "@/styles/fonts";

import { filterOption } from "@/components/form/_shared/utils";
import { PropsSnackPanel } from "./snackpanel.types";
import style from "./snackpanel.module.scss";

const SnackPanel = ({ nameCategory, snacks }: PropsSnackPanel) => {
  const [filteredName, setFilteredName] = useState("");
  const { addNewModal } = useModalActions();

  const snacksFiltered = useMemo(() => {
    const filteredOptions = filterOption(
      filteredName,
      snacks.map((snack) => snack.name)
    );

    return snacks.filter((snack) => filteredOptions.includes(snack.name));
  }, [filteredName, snacks]);

  return (
    <div>
      <FilterField
        label="Filtrar item..."
        name={`${nameCategory}_snack`}
        onChange={(text) => setFilteredName(text)}
      />
      <hr className="division" style={{ margin: "1rem 0" }} />

      {!snacksFiltered.length && (
        <div className={style.not_item}>
          <Icon icon="majesticons:information-circle-line"></Icon>
          <p>Nenhum item encontrado</p>
        </div>
      )}

      <Grid sizeItem={180}>
        <button
          className={clsx(averiaSansLibre.className, style.create_snack)}
          onClick={() => addNewModal(<AddItem nameCategory={nameCategory} />)}
        >
          Adicionar item
        </button>

        {!!snacksFiltered.length && (
          <AnimatePresence>
            {snacksFiltered.map((snack, index) => (
              <div
                key={index}
                onClick={() =>
                  addNewModal(
                    <EditItem nameCategory={nameCategory} dataSnack={snack} />
                  )
                }
              >
                <Snack {...snack} />
              </div>
            ))}
          </AnimatePresence>
        )}
      </Grid>
    </div>
  );
};

export default SnackPanel;
