"use client";

import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";

import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import NavStock from "@/components/navigation/NavStock";
import Folder from "@/components/interface/Folder";
import useAuth from "@/hooks/context/useAuth";

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
                  >
                    <p>Teste</p>
                  </Folder>
                ))
              ) : (
                <div className={style.not_categories}>
                  <Icon icon="majesticons:information-circle-line"></Icon>
                  <p>Nenhuma seção foi encontrada</p>
                </div>
              )}
            </div>
            <div className={style.container_add_session}>
              <p>Adicionar nova seção</p>
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
