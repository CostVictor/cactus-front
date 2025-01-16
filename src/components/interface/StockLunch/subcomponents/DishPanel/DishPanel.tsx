import { Icon } from "@iconify/react";

import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import ItemInfo from "@/components/display/ItemInfo";
import Container from "@/components/layout/Container";

import { DishPanelProps } from "./dishpanel.types";
import style from "./dishpanel.module.scss";

const DishPanel = ({ dish, allIngredientsName }: DishPanelProps) => {
  const { addNewModal, removeModal } = useModalActions();
  const { multiple_choice, single_choice } = dish.ingredients;

  return (
    <div className={style.container_main}>
      {!multiple_choice.length && (
        <span className={style.not_item}>
          <Icon icon="majesticons:information-circle-line"></Icon>
          <p>Nenhum ingrediente de múltipla escolha vinculado</p>
        </span>
      )}

      <Container grid={5}>
        <ItemInfo
          text="Vincular item"
          onClick={() =>
            addNewModal(
              <Modal
                title="Recurso indisponível"
                message="A vinculação de ingredientes ainda está em desenvolvimento."
              />
            )
          }
          colorDark
          typeAdd
        />
      </Container>
    </div>
  );
};

export default DishPanel;
