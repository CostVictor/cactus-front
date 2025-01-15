"use client";

import { Icon } from "@iconify/react";

import useModalActions from "@/hooks/context/useModal";
import useWebSocket from "@/hooks/network/useWebSocket";
import Folder from "@/components/interface/Folder";
import Button from "@/components/forms/Button";

import SnackPanel from "./subcomponents/SnackPanel";
import AddCategory from "./subcomponents/AddCategory";
import EditCategory from "./subcomponents/EditCategory";
import EditOrderCategory from "./subcomponents/EditOrderCategory";

import { BaseCategory } from "@APISCMapping/snacks.types";
import { stockSnackEP } from "@APISCMapping/endpoints";
import style from "./stocksnack.module.scss";

const StockSnack = () => {
  const { data, isLoading } = useWebSocket<BaseCategory[]>(stockSnackEP.base);
  const { addNewModal } = useModalActions();

  return (
    <>
      {Array.isArray(data) && data.length > 1 && (
        <div className={style.btn_reorder}>
          <Button
            text="Ordenar"
            appearance="main"
            onClick={() =>
              addNewModal(
                <EditOrderCategory
                  listCategories={data.map((category) => category.name)}
                />
              )
            }
          />
        </div>
      )}
      <div className={style.container_sessions}>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((category, index) => (
            <Folder
              key={index}
              name={category.name}
              folderConfig={{
                marker: {
                  appearance: "mingcute:storage-fill",
                  type: "icon",
                },
                edit: () => addNewModal(<EditCategory category={category} />),
              }}
              notification={
                category.snacks.filter((snack) => snack.quantity_in_stock <= 5)
                  .length
                  ? {
                      labels: [
                        { text: "Produtos se esgotando", type: "alert" },
                      ],
                    }
                  : undefined
              }
            >
              <SnackPanel
                nameCategory={category.name}
                snacks={category.snacks}
              />
            </Folder>
          ))
        ) : (
          <div className={style.message}>
            {isLoading ? (
              <p>Verificando o estoque...</p>
            ) : (
              <>
                <Icon icon="majesticons:information-circle-line"></Icon>
                <p>Nenhuma categoria foi encontrada</p>
              </>
            )}
          </div>
        )}
      </div>
      <AddCategory />
    </>
  );
};

export default StockSnack;
