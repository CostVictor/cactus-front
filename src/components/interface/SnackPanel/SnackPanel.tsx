import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Snack from "./subcomponents/Snack";
import Container from "@/components/layout/Container";
import InputField from "@/components/forms/InputField";

import { PropsSnackPanel } from "./snackpanel.types";
import style from "./snackpanel.module.scss";

const SnackPanel = ({ nameCategory, snacks }: PropsSnackPanel) => {
  const [filterName, setFilterName] = useState("");

  return (
    <div>
      <InputField
        name={`filter-${nameCategory}`}
        label="Filtrar item..."
        onChange={(_, newValue) => setFilterName(newValue.toLowerCase())}
        filterMode
      />
      <hr className="division" style={{ margin: "1rem 0" }} />
      {snacks.length > 0 ? (
        <Container grid={5}>
          <article className={style.create_snack}>
            <p>Adicionar item</p>
          </article>

          <AnimatePresence>
            {snacks
              .filter((snack) => snack.name.toLowerCase().includes(filterName))
              .map((snack, index) => (
                <Snack key={index} {...snack} />
              ))}
          </AnimatePresence>
        </Container>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default SnackPanel;
