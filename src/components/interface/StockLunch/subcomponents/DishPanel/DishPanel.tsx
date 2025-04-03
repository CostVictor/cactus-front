import { Icon } from "@iconify/react";
import { useMemo } from "react";
import clsx from "clsx";

import { averiaSansLibre } from "@/styles/fonts";
import ChoiceBlock from "./subcomponents/ChoiceBlock";

import useModalActions from "@/hooks/context/useModal";
import AddComposition from "./subcomponents/ChoiceBlock/subcomponents/AddComposition";

import { DishPanelProps } from "./dishpanel.types";
import style from "./dishpanel.module.scss";

const DishPanel = ({ dish, allIngredientsName }: DishPanelProps) => {
  const { multiple_choice, single_choice } = dish.ingredients;
  const { addNewModal } = useModalActions();

  // Verifica quais são os ingredientes que ainda não foram vinculados ao prato.
  const nameIngredientsNotIncludedInDish = useMemo(
    () =>
      allIngredientsName.filter(
        (name) =>
          !multiple_choice.find((ingredient) => ingredient.name === name) &&
          !Object.values(single_choice ?? {})
            .flat()
            .find((ingredient) => ingredient.name === name)
      ),
    [allIngredientsName, multiple_choice, single_choice]
  );

  const quantityFieldSingleChoice = Object.keys(single_choice ?? {}).length;

  return (
    <div className={style.container_main}>
      {!multiple_choice.length && (
        <span className={style.not_item}>
          <Icon icon="majesticons:information-circle-line"></Icon>
          <p>Nenhum ingrediente de múltipla escolha vinculado</p>
        </span>
      )}

      {/* Grid de múltipla escolha */}
      <ChoiceBlock
        ingredients={multiple_choice}
        optionsToAdd={nameIngredientsNotIncludedInDish}
        quantityFieldSingleChoice={quantityFieldSingleChoice}
        dayName={dish.day_name}
        choiceNumber={0}
      />

      {!!quantityFieldSingleChoice &&
        Object.values(single_choice ?? {}).map((listIngredients, index) => (
          // Grid de escolha individual
          <ChoiceBlock
            key={index}
            ingredients={listIngredients}
            optionsToAdd={nameIngredientsNotIncludedInDish}
            quantityFieldSingleChoice={quantityFieldSingleChoice}
            dayName={dish.day_name}
            choiceNumber={index + 1}
          />
        ))}

      <button
        className={clsx(averiaSansLibre.className, style.add_single_choice)}
        onClick={() =>
          addNewModal(
            <AddComposition
              dayName={dish.day_name}
              options={nameIngredientsNotIncludedInDish}
              choiceNumber={quantityFieldSingleChoice + 1}
            />
          )
        }
      >
        Adicionar área de escolha única
      </button>
    </div>
  );
};

export default DishPanel;
