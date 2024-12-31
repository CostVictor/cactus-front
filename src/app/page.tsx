"use client";

import Sidebar from "@/components/navigation/Sidebar";
import Header from "@/components/layout/Header";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

import CardInfo from "@/components/display/CardInfo";
import useRequest from "@/hooks/network/useRequest";

import { stockSnacksEP } from "@APISCMapping/endpoints";
import { BaseCategory } from "@APISCMapping/snacks.types";

export default function Home() {
  const targets = [{ text: "Início", link: "#inicio" }];

  const {
    info: { data },
  } = useRequest({ request: { url: stockSnacksEP.base, method: "GET" } });

  // Percorre as categorias obtidas da requisição e adiciona a âncora na página.
  if (Array.isArray(data)) {
    data.forEach((category: BaseCategory) => {
      const name = category.name;
      targets.push({ text: name, link: `#${name}` });
    });
  }

  return (
    <>
      <Header targets={targets} />
      <main>
        <Section
          id="inicio"
          sectionImage={{ background: "/imgSection/img1.svg" }}
          description={{
            title: "Bem vindo à lanchonete CACTUS!!",
            text: "Onde o sabor encontra a tradição! Desde 2012, estamos dedicados a trazer para você os melhores lanches, feitos com ingredientes frescos e de qualidade.",
            illustrationUrl: "/image-Chef.svg",
            illustrationDirection: "left",
          }}
        />

        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((category: BaseCategory, indexCategory: number) => (
            <Section
              id={category.name}
              key={`section_${category.name}`}
              description={
                category.description
                  ? {
                      ...category.description,
                      illustrationUrl: category.description.illustration_url,
                      illustrationDirection:
                        indexCategory % 2 === 0 ? "right" : "left",
                    }
                  : undefined
              }
              backgroundGray={indexCategory % 2 === 0}
            >
              {Array.isArray(category.snacks) && category.snacks.length > 0 && (
                <Container grid>
                  {category.snacks.map((snack, indexSnack) => (
                    <CardInfo
                      key={`snack_${indexSnack}-${category.name}`}
                      title={snack.name}
                      text={snack.price}
                      isSoldOut={!Number(snack.quantity_in_stock)}
                    />
                  ))}
                </Container>
              )}
            </Section>
          ))}
      </main>
      <Sidebar />
    </>
  );
}
