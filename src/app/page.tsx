"use client";

import { useEffect } from "react";

import Sidebar from "@/components/navigation/Sidebar";
import Header from "@/components/layout/Header";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

import CardInfo from "@/components/display/CardInfo";
import Modal from "@/components/display/Modal";

import useModal from "@/hooks/context/useModal";
import useRequest from "@/hooks/network/useRequest";

import { formatMoney } from "@/utils/formatters";

export default function Home() {
  const {
    actions: { addNewModal },
  } = useModal();

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

  const targets = [{ text: "Início", link: "#inicio" }];

  // Percorre as categorias obtidas da requisição e adiciona a âncora na página.
  if (Array.isArray(data)) {
    data.forEach((category) => {
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
        >
          <Container grid>
            <CardInfo
              title="Card 1"
              text="Clique em mim!"
              imgUrl="/imgSection/img1.svg"
              onClick={() => {
                addNewModal(
                  <Modal
                    title="Card 1"
                    message="Conteúdo descritivo do Card 1"
                  />
                );
              }}
            />
            <CardInfo
              title="Card 2"
              text="Clique em mim!"
              imgUrl="/imgSection/img1.svg"
              onClick={() => {
                addNewModal(
                  <Modal
                    title="Card 2"
                    message="Conteúdo descritivo do Card 2"
                  />
                );
              }}
            />
            <CardInfo
              title="Card 3"
              text="Clique em mim!"
              imgUrl="/imgSection/img1.svg"
              onClick={() => {
                addNewModal(
                  <Modal
                    title="Card 3"
                    message="Conteúdo descritivo do Card 3"
                  />
                );
              }}
            />
          </Container>
        </Section>

        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((category, index) => (
            <Section
              id={category.name}
              key={`section_${category.name}`}
              description={
                category.description
                  ? {
                      ...category.description,
                      illustrationUrl: category.description.illustration_url,
                      illustrationDirection: index % 2 === 0 ? "right" : "left",
                    }
                  : undefined
              }
              backgroundGray={index % 2 === 0}
            >
              <Container grid>
                {Array.isArray(category.snacks) &&
                  category.snacks.length > 0 &&
                  category.snacks.map(
                    (snack: { [key: string]: string }, index: number) => (
                      <CardInfo
                        key={`snack_${index}-${category.name}`}
                        title={snack.name}
                        text={formatMoney(snack.price)}
                        isSoldOut={!Number(snack.quantity_in_stock)}
                      />
                    )
                  )}
              </Container>
            </Section>
          ))}
      </main>
      <Sidebar />
    </>
  );
}
