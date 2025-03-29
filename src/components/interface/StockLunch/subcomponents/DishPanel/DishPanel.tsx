import { Icon } from "@iconify/react";
import { useMemo } from "react";

import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import ItemInfo from "@/components/display/ItemInfo";
import Grid from "@/components/layout/Grid";

import AddComposition from "./subcomponents/AddComposition";

import { apiHTTP } from "@api/endpoints";
import { DishPanelProps } from "./dishpanel.types";
import style from "./dishpanel.module.scss";

const DishPanel = ({ dish, allIngredientsName }: DishPanelProps) => {
  const { addNewModal, removeModal } = useModalActions();
  const { multiple_choice, single_choice } = dish.ingredients;
  const { lunch } = apiHTTP;

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

  return (
    <div className={style.container_main}>
      {!multiple_choice.length && (
        <span className={style.not_item}>
          <Icon icon="majesticons:information-circle-line"></Icon>
          <p>Nenhum ingrediente de múltipla escolha vinculado</p>
        </span>
      )}

      {/* Grid de múltipla escolha */}
      <Grid>
        <ItemInfo
          text="Vincular item"
          onClick={() =>
            addNewModal(
              <AddComposition
                dayName={dish.day_name}
                options={nameIngredientsNotIncludedInDish}
              />
            )
          }
          colorDark
          typeAdd
        />

        {multiple_choice.map((ingredient, index) => (
          <ItemInfo
            key={index}
            text={ingredient.name}
            actionIcon="material-symbols:edit-square-outline"
            displayIcon="gridicons:sync"
          />
        ))}
      </Grid>
    </div>
  );
};

export default DishPanel;
