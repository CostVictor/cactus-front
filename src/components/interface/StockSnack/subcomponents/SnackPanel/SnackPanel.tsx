"use client";

import { AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";

import Snack from "./subcomponents/Snack";
import AddItem from "./subcomponents/AddItem";
import useModalActions from "@/hooks/context/useModal";
import EditItem from "./subcomponents/EditItem";
import Grid from "@/components/layout/Grid";

import { PropsSnackPanel } from "./snackpanel.types";
import style from "./snackpanel.module.scss";

const SnackPanel = ({ nameCategory, snacks }: PropsSnackPanel) => {
  const [filteredName, setFilteredName] = useState("");
  const { addNewModal } = useModalActions();

  const snacksFiltered = snacks.filter((snack) =>
    snack.name.toLowerCase().includes(filteredName.toLowerCase())
  );

  return (
    <div>
      {/* <InputField
        name={`filter-${nameCategory}`}
        label="Filtrar item..."
        onChange={(_, text) => setFilteredName(text)}
        filterMode
      /> */}
      <hr className="division" style={{ margin: "1rem 0" }} />

      {!snacksFiltered.length && (
        <div className={style.not_item}>
          <Icon icon="majesticons:information-circle-line"></Icon>
          <p>Nenhum item encontrado</p>
        </div>
      )}

      <Grid>
        <AddItem nameCategory={nameCategory} />

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
