"use client";

import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default function Home() {
  const targets = [
    { text: "Início", link: "#inicio" },
    { text: "Salgados", link: "#salgados" },
  ];

  return (
    <>
      <Header targets={targets} />
      <main></main>
      <Aside />
    </>
  );
}
