import { useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence } from "framer-motion";

import Snack from "./subcomponents/Snack";
import Container from "@/components/layout/Container";
import InputField from "@/components/forms/InputField";
import AddItem from "./subcomponents/AddItem";

import { PropsSnackPanel } from "./snackpanel.types";
import style from "./snackpanel.module.scss";

const SnackPanel = ({ nameCategory, snacks }: PropsSnackPanel) => {
  const [snacksList, setSnacksList] = useState(snacks);
  const [filterName, setFilterName] = useState("");

  console.log("renderiou");

  return (
    <div>
      <InputField
        name={`filter-${nameCategory}`}
        label="Filtrar item..."
        onChange={(_, newValue) => setFilterName(newValue.toLowerCase())}
        filterMode
      />
      <hr className="division" style={{ margin: "1rem 0" }} />

      {!snacksList.length && (
        <div className={style.not_item}>
          <Icon icon="majesticons:information-circle-line"></Icon>
          <p>Nenhum item encontrado</p>
        </div>
      )}

      <Container grid={5}>
        <AddItem nameCategory={nameCategory} setSnacksList={setSnacksList} />

        {snacksList.length > 0 && (
          <AnimatePresence>
            {snacksList
              .filter((snack) => snack.name.toLowerCase().includes(filterName))
              .map((snack, index) => (
                <Snack key={index} {...snack} />
              ))}
          </AnimatePresence>
        )}
      </Container>
    </div>
  );
};

export default SnackPanel;
