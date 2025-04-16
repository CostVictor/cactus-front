"use client";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/navigation/Sidebar";
import Header from "@/components/layout/Header";

import Section from "@/components/layout/Section";
import Grid from "@/components/layout/Grid";

import Modal from "@/components/display/Modal";
import useModalActions from "@/hooks/context/useModal";

import CardInfo from "@/components/display/CardInfo";
import useRequest from "@/hooks/network/useRequest";

import { BaseCategory } from "@api/types/snack";
import { apiHTTP } from "@api/endpoints";

export default function Home() {
  const { addNewModal } = useModalActions();
  const router = useRouter();

  const targets = [{ text: "Início", link: "#inicio" }];
  const { snack } = apiHTTP;

  const {
    info: { data },
  } = useRequest<BaseCategory[]>({
    initFetchData: {
      request: { url: snack.baseUrl, method: "GET" },
      modalTitleWhenError: "Erro ao carregar as categorias",
    },
  });

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
        />

        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((category, indexCategory) => (
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
              {Array.isArray(category.snacks) && !!category.snacks.length && (
                <Grid>
                  {category.snacks.map((snack, indexSnack) => (
                    <CardInfo
                      key={`snack_${indexSnack}-${category.name}`}
                      title={snack.name}
                      text={snack.price}
                      isSoldOut={!Number(snack.quantity_in_stock)}
                      onClick={() =>
                        Number(snack.quantity_in_stock)
                          ? router.push(
                              `/buy?category=${category.name}&item=${snack.name}`
                            )
                          : addNewModal(
                              <Modal
                                title="Item Esgotado"
                                message={`O item "${snack.name}" encontra-se esgotado no momento.`}
                              />
                            )
                      }
                    />
                  ))}
                </Grid>
              )}
            </Section>
          ))}
      </main>
      <Sidebar />
    </>
  );
}
