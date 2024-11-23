"use client";

import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";

import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import NavStock from "@/components/navigation/NavStock";
import Folder from "@/components/interface/Folder";
import useAuth from "@/hooks/context/useAuth";

import SnackPanel, { SnackProps } from "@/components/interface/SnackPanel";
import style from "./snacks.module.scss";

export default function StockSnacks() {
  const {
    state: { isAuthenticated },
    network: { data, isLoading },
    actions: { safeFeth },
  } = useAuth("employee", () => safeFeth({ url: "snacks/", method: "GET" }));

  return !isLoading ? (
    isAuthenticated ? (
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
                    folderConfig={{
                      marker: {
                        appearance: "mingcute:storage-fill",
                        type: "icon",
                      },
                    }}
                    notification={
                      category.snacks.filter(
                        (snack: SnackProps) => snack.quantity_in_stock <= 5
                      ).length
                        ? {
                            labels: [
                              { text: "Produtos se esgotando", type: "alert" },
                            ],
                          }
                        : undefined
                    }
                  >
                    <SnackPanel nameCategory={category.name} snacks={category.snacks} />
                  </Folder>
                ))
              ) : (
                <div className={style.not_categories}>
                  <Icon icon="majesticons:information-circle-line"></Icon>
                  <p>Nenhuma categoria foi encontrada</p>
                </div>
              )}
            </div>
          </Section>
        </main>
        <Sidebar />
      </>
    ) : (
      notFound()
    )
  ) : null;
}
