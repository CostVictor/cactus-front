import { PropsSelectionPanel } from "./selectionpanel.types";
import Container from "@/components/structural/Container";
import style from "./selectionpanel.module.scss";

const SelectionPanel = ({
  options,
  localValue,
  setLocalValue,
}: PropsSelectionPanel) => {
  console.log("ok SelectionPanel");

  return (
    <Container className={style.container} animateChildren>
      {options
        .filter((option) =>
          option.toLowerCase().includes(localValue.toLowerCase())
        )
        .map((option, index) => (
          <p
            key={index}
            className={style.option}
            onMouseDown={() => setLocalValue(option)}
          >
            {option}
          </p>
        ))}
    </Container>
  );
};

export default SelectionPanel;
