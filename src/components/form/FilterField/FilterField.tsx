import { debounce } from "lodash";
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
  return (
    <div className={style.container_main}>
      <input
        id={`filter_${name}`}
        placeholder={label}
        onChange={debounce((event) => onChange(event.target.value), wait)}
        className={style.input}
        type="text"
      />
      {!!message && <Message text={message} />}
    </div>
  );
};

export default FilterField;
