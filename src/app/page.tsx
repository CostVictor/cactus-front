"use client";

import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Section from "@/components/Section";
import CardInfo from "@/components/CardInfo";
import Container from "@/components/Container";
import useModal from "@/hooks/context/useModal";
import Modal from "@/components/Modal";

export default function Home() {
  const modals = useModal();
  const targets = [
    { text: "Início", link: "#inicio" },
    { text: "Pratos", link: "#pratos" },
  ];

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
                modals.addNewModal(
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
                modals.addNewModal(
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
                modals.addNewModal(
                  <Modal
                    title="Card 3"
                    message="Conteúdo descritivo do Card 3"
                  />
                );
              }}
            />
          </Container>
        </Section>

        <Section
          id="pratos"
          description={{
            title: "Experimente nossos Pratos!",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eos, accusamus dicta sed dolorum iste reiciendis placeat temporibus non rerum excepturi qui libero ad tenetur numquam.",
            illustrationUrl: "/image-Dish.svg",
          }}
          backgroundGray
        >
          <Container grid>
            <CardInfo title="Segunda" icon="streamline:zero-hunger" />
            <CardInfo title="Terça" icon="streamline:zero-hunger" />
            <CardInfo title="Quarta" icon="streamline:zero-hunger" />
            <CardInfo title="Quinta" icon="streamline:zero-hunger" />
            <CardInfo title="Sexta" icon="streamline:zero-hunger" />
          </Container>
        </Section>
      </main>
      <Aside />
    </>
  );
}
