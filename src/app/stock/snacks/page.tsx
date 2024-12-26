"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import NavStock from "@/components/navigation/NavStock";
import Folder from "@/components/interface/Folder";
import AddCategory from "@/components/action/AddCategory";
import SnackPanel from "@/components/interface/SnackPanel";

import { PropsCategory } from "./snacks.types";
import style from "./snacks.module.scss";

export default function StockSnacks() {
  const [data, setData] = useState<PropsCategory[] | null>(null);

  return (
    <>
      <Header />
      <main>
        <Section id="stock_snacks" maxWidthContent>
          <NavStock local="snacks" />
          <hr className="division space" />
          <div className={style.container_sessions}>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((category: PropsCategory, index) => (
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
              <div className={style.not_categories}>
                <Icon icon="majesticons:information-circle-line"></Icon>
                <p>Nenhuma categoria foi encontrada</p>
              </div>
            )}
          </div>
          <AddCategory setData={setData} />
        </Section>
      </main>
      <Sidebar />
    </>
  );
}
