"use client";

import { AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";

import Snack from "./subcomponents/Snack";
import Container from "@/components/layout/Container";
import InputField from "@/components/forms/InputField";
import AddItem from "./subcomponents/AddItem";
import useModalActions from "@/hooks/context/useModal";
import EditItem from "./subcomponents/EditItem";

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
      <InputField
        name={`filter-${nameCategory}`}
        label="Filtrar item..."
        onChange={(_, text) => setFilteredName(text)}
        filterMode
      />
      <hr className="division" style={{ margin: "1rem 0" }} />

      {!snacksFiltered.length && (
        <div className={style.not_item}>
          <Icon icon="majesticons:information-circle-line"></Icon>
          <p>Nenhum item encontrado</p>
        </div>
      )}

      <Container grid={5}>
        <AddItem nameCategory={nameCategory} />

        {snacksFiltered.length > 0 && (
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
      </Container>
    </div>
  );
};

export default SnackPanel;
