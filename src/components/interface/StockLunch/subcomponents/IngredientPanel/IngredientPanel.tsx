import { Icon } from "@iconify/react";

import useModalActions from "@/hooks/context/useModal";
import ItemInfo from "@/components/display/ItemInfo";
import Container from "@/components/layout/Container";

import AddIngredient from "./subcomponents/AddIngredient";
import EditIngredient from "./subcomponents/EditIngredient";

import { IngredientPanelProps } from "./ingredientpanel.types";
import style from "./ingredientpanel.module.scss";

const IngredientPanel = ({ ingredients, isLoading }: IngredientPanelProps) => {
  const { addNewModal } = useModalActions();

  return (
    <div className={style.container_main}>
      <div className={style.container_title}>
        <h3>Ingredientes</h3>
      </div>

      {!ingredients.length && (
        <div className={style.message}>
          {isLoading ? (
            <p>Verificando o estoque...</p>
          ) : (
            <>
              <Icon icon="majesticons:information-circle-line"></Icon>
              <p>Nenhum item encontrado</p>
            </>
          )}
        </div>
      )}

      <Container grid={5} className={style.container_content}>
        <ItemInfo
          text="Adicionar item"
          onClick={() => addNewModal(<AddIngredient />)}
          typeAdd
        />
        {ingredients.length > 0 &&
          ingredients.map((ingredient, index) => (
            <ItemInfo
              key={index}
              text={ingredient.name}
              alternativeText={
                ingredient.additional_charge
                  ? `${ingredient.additional_charge} p/ acrescimo`
                  : undefined
              }
              onClick={() =>
                addNewModal(<EditIngredient ingredient={ingredient} />)
              }
              actionIcon="material-symbols:edit-square-outline"
              displayIcon="streamline:zero-hunger"
            />
          ))}
      </Container>
    </div>
  );
};

export default IngredientPanel;
