import { useState } from "react";
import { Reorder } from "framer-motion";
import { Icon } from "@iconify/react";

import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import { stockSnacksEP } from "@APISCMapping/endpoints";
import { EditOrderCategoryProps } from "./editordercategory.types";
import style from "./editordercategory.module.scss";

const EditOrderCategory = ({ listCategories }: EditOrderCategoryProps) => {
  const [categories, setCategories] = useState(listCategories);
  const { removeModal } = useModalActions();
  const {
    actions: { fetchData },
  } = useRequest<null>(undefined, {
    forceLoadingRequest: false,
    standardDisplayError: "Erro ao reordenar as categorias",
  });

  return (
    <Modal
      title="Ordenar Categorias"
      buttons={[
        { text: "Cancelar", onClick: () => removeModal(-1) },
        {
          text: "Salvar",
          appearance: "main",
          onClick: () => {
            if (JSON.stringify(categories) !== JSON.stringify(listCategories)) {
              fetchData({
                request: {
                  url: stockSnacksEP.base,
                  data: { update_position_order: categories },
                  method: "PATCH",
                },
                onSuccess: () => removeModal(-1),
              });
            } else {
              removeModal(-1);
            }
          },
        },
      ]}
    >
      <Reorder.Group
        axis="y"
        values={categories}
        onReorder={setCategories}
        className={style.container_reorder}
      >
        {categories.map((category, index) => (
          <Reorder.Item key={category} value={category} className={style.item}>
            <Icon
              className={style.symbol}
              icon={
                !index
                  ? "flowbite:chevron-down-outline"
                  : index + 1 === categories.length
                  ? "flowbite:chevron-up-outline"
                  : "flowbite:chevron-sort-outline"
              }
            />
            {category}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </Modal>
  );
};

export default EditOrderCategory;
