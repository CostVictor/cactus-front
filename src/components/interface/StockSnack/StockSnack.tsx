"use client";

import { Icon } from "@iconify/react";

import useModalActions from "@/hooks/context/useModal";
import useWebSocket from "@/hooks/network/useWebSocket";
import Folder from "@/components/interface/Folder";

import SnackPanel from "./subcomponents/SnackPanel";
import AddCategory from "./subcomponents/AddCategory";
import EditCategory from "./subcomponents/EditCategory";
import EditOrderCategory from "./subcomponents/EditOrderCategory";
import Button from "@/components/form/Button";

import { apiWS } from "@api/endpoints";
import { BaseCategory } from "@api/types/snack";

import style from "./stocksnack.module.scss";

const StockSnack = () => {
  const { snack } = apiWS;
  const { data, isLoading } = useWebSocket<BaseCategory[]>(snack.baseUrl);
  const { addNewModal } = useModalActions();

  return (
    <>
      {Array.isArray(data) && data.length > 1 && (
        <div className={style.btn_reorder}>
          <Button
            text="Editar Ordem"
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
              key={`folder_${index}`}
              name={category.name}
              config={{
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
      <div
        className={style.add_category}
        onClick={() => addNewModal(<AddCategory />)}
      >
        <p>Adicionar nova categoria</p>
      </div>
    </>
  );
};

export default StockSnack;
