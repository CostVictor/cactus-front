"use client";

import { Icon } from "@iconify/react";

import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import NavStock from "@/components/navigation/NavStock";
import Folder from "@/components/interface/Folder";
import SnackPanel from "@/components/interface/SnackPanel";
import AddCategory from "@/components/action/AddCategory";

import useWebSocket from "@/hooks/network/useWebSocket";
import { BaseCategory } from "@APISCMapping/snacks.types";
import { stockSnacksEP } from "@APISCMapping/endpoints";
import style from "./snacks.module.scss";

export default function StockSnacks() {
  const { data, isLoading } = useWebSocket<BaseCategory[]>(stockSnacksEP.base);

  console.log("render");

  return (
    <>
      <Header />
      <main>
        <Section id="stock_snacks" maxWidthContent>
          <NavStock local="snacks" />
          <hr className="division space" />
          <div className={style.container_sessions}>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((category, index) => (
                <Folder
                  key={index}
                  name={category.name}
                  description={category.description}
                  folderConfig={{
                    marker: {
                      appearance: "mingcute:storage-fill",
                      type: "icon",
                    },
                  }}
                  notification={
                    category.snacks.filter(
                      (snack) => snack.quantity_in_stock <= 5
                    ).length
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
        </Section>
      </main>
      <Sidebar />
    </>
  );
}
