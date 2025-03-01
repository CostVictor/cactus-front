import { useState } from "react";
import { Reorder } from "framer-motion";
import { Icon } from "@iconify/react";

import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import { stockSnackEP } from "@APISCMapping/endpoints";
import { EditOrderCategoryProps } from "./editordercategory.types";
import style from "./editordercategory.module.scss";

const EditOrderCategory = ({ listCategories }: EditOrderCategoryProps) => {
  const [categories, setCategories] = useState(listCategories);
  const { removeModal } = useModalActions();
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>(undefined, {
    standardDisplayError: "Erro ao reordenar as categorias",
  });

  return (
    <Modal
      formMode="button"
      title="Ordenar Categorias"
      buttons={[
        { text: "Cancelar", onClick: () => removeModal() },
        {
          isLoading,
          text: "Salvar",
          appearance: "principal",
          onClick: () => {
            if (JSON.stringify(categories) !== JSON.stringify(listCategories)) {
              fetchData({
                request: {
                  url: stockSnackEP.base,
                  data: { update_position_order: categories },
                  method: "PATCH",
                },
                onSuccess: () => removeModal(),
              });
            } else {
              removeModal();
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
