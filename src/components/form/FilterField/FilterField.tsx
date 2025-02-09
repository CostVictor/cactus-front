import { useCallback } from "react";

import Message from "../_shared/_subcomponents/Message";
import { PropsFilterField } from "./filterfield.types";
import style from "./filterfield.module.scss";

const FilterField = ({
  name,
  label,
  onChange,
  message,
  wait = 450,
}: PropsFilterField) => {
  const filterName = `filter_${name}`;

  return (
    <div className={style.container_main}>
      <input
        id={filterName}
        placeholder={label}
        onChange={(event) => onChange(event.target.value)}
        className={style.input}
        type="text"
      />
      {!!message && <Message text={message} />}
    </div>
  );
};

export default FilterField;
