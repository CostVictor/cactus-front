import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Section from "@/components/Section";

export default function Home() {
  const targets = [
    { text: "Início", link: "#inicio" },
    { text: "Salgados", link: "#salgados" },
  ];

  return (
    <>
      <Header targets={targets} />
      <main>
        <Section
          id="inicio"
          description={{
            title: "Bem vindo à lanchonete CACTUS!!",
            text: "Onde o sabor encontra a tradição! Desde 2012, estamos dedicados a trazer para você os melhores lanches, feitos com ingredientes frescos e de qualidade.",
            illustrationUrl: "/image-Chef.svg",
          }}
        />
        <Section
          id="salgados"
          backgroundColor="#e9e9e9"
        />
      </main>
      <Aside />
    </>
  );
}
