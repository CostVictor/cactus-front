import { AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";

import Snack from "./subcomponents/Snack";
import Container from "@/components/layout/Container";
import InputField from "@/components/forms/InputField";
import AddItem from "./subcomponents/AddItem";

import { PropsSnackPanel } from "./snackpanel.types";
import style from "./snackpanel.module.scss";

const SnackPanel = ({ nameCategory, snacks }: PropsSnackPanel) => {
  const [snacksList, setSnacksList] = useState(snacks);

  return (
    <div>
      <InputField
        name={`filter-${nameCategory}`}
        label="Filtrar item..."
        onChange={(_, text) =>
          setSnacksList(
            snacks.filter((snack) =>
              snack.name.toLowerCase().includes(text.toLowerCase())
            )
          )
        }
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
            {snacksList.map((snack, index) => (
              <div key={index}>
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
