"use client";

import { useEffect } from "react";

import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import useRequest from "@/hooks/network/useRequest";
import NavStock from "@/components/navigation/NavStock";

export default function StockSnacks() {
  const {
    info: { data },
    actions: { fethData },
  } = useRequest();

  useEffect(() => {
    // fethData({
    //   url: "snacks/",
    //   method: "GET",
    // });
  }, [fethData]);

  const categoryNames: string[] = [];
  if (Array.isArray(data)) {
    data.forEach((category) => {
      categoryNames.push(category.name);
    });
  }

  return (
    <>
      <Header />
      <main>
        <Section id="stock_snacks" maxWidthContent>
          <NavStock local="snacks" />
          <hr style={{ border: "1px solid var(--division)" }} />
        </Section>
      </main>
      <Sidebar />
    </>
  );
}
