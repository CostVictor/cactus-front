"use client";

import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import useRequest from "@/hooks/network/useRequest";
import NavStock from "@/components/navigation/NavStock";
import Folder from "@/components/interface/Folder";

import style from "./snacks.module.scss";

export default function StockSnacks() {
  const {
    info: { data },
    actions: { fethData },
  } = useRequest();

  useEffect(() => {
    fethData({
      url: "snacks/",
      method: "GET",
    });
  }, [fethData]);

  // // "mingcute:storage-fill"

  return (
    <>
      <Header />
      <main>
        <Section id="stock_snacks" maxWidthContent>
          <NavStock local="snacks" />
          <hr className="division" />
          <div className={style.container_reorder}>
            {Array.isArray(data) &&
              data.map((category, index) => (
                <Folder key={index} name={category.name}>
                  <p>Teste</p>
                </Folder>
              ))}
          </div>
        </Section>
      </main>
      <Sidebar />
    </>
  );
}
