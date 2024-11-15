"use client";

import { notFound } from "next/navigation";

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
  } = useAuth("employee");

  // "mingcute:storage-fill"

  return !isLoading ? (
    isAuthenticated ? (
      <>
        {/* <Header /> */}
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
        {/* <Sidebar /> */}
      </>
    ) : (
      notFound()
    )
  ) : null;
}
