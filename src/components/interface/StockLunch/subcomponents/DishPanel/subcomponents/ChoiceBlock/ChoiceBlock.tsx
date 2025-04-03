import ItemInfo from "@/components/display/ItemInfo";
import Grid from "@/components/layout/Grid";
import clsx from "clsx";

import useModalActions from "@/hooks/context/useModal";
import AddComposition from "./subcomponents/AddComposition";
import EditComposition from "./subcomponents/EditComposition";

import { PropsChoiceBlock } from "./choiceblock.types";
import style from "./choiceblock.module.scss";

const ChoiceBlock = ({
  dayName,
  ingredients,
  optionsToAdd,
  choiceNumber,
  quantityFieldSingleChoice,
}: PropsChoiceBlock) => {
  const { addNewModal } = useModalActions();

  return (
    <Grid
      sizeItem={210}
      className={clsx(style.container_main, {
        [style.single_choice]: !!choiceNumber,
      })}
    >
      {!!choiceNumber && (
        <span className={style.span}>Escolha única {choiceNumber}</span>
      )}

      <ItemInfo
        text="Vincular ingrediente"
        onClick={() =>
          addNewModal(
            <AddComposition
              dayName={dayName}
              options={optionsToAdd}
              choiceNumber={choiceNumber}
            />
          )
        }
        colorDark
        typeAdd
      />

      {ingredients.map((ingredient, index) => (
        <ItemInfo
          key={index}
          text={ingredient.name}
          actionIcon="material-symbols:edit-square-outline"
          displayIcon="gridicons:sync"
          onClick={() =>
            addNewModal(
              <EditComposition
                dayName={dayName}
                ingredientName={ingredient.name}
                currentChoiceNumber={choiceNumber}
                quantityFieldSingleChoice={quantityFieldSingleChoice}
              />
            )
          }
        />
      ))}
    </Grid>
  );
};

export default ChoiceBlock;
