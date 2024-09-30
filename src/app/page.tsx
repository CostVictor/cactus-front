import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Section from "@/components/Section";

export default function Home() {
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
          description={{
            title: "Bem vindo à lanchonete CACTUS!!",
            text: "Onde o sabor encontra a tradição! Desde 2012, estamos dedicados a trazer para você os melhores lanches, feitos com ingredientes frescos e de qualidade.",
            illustrationUrl: "/image-Chef.svg",
            illustrationDirection: "left",
          }}
        />
        <Section
          id="pratos"
          description={{
            title: "Experimente nossos Pratos!",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eos, accusamus dicta sed dolorum iste reiciendis placeat temporibus non rerum excepturi qui libero ad tenetur numquam.",
            illustrationUrl: "/image-Dish.svg",
          }}
          isBackgroundGray
        />
      </main>
      <Aside />
    </>
  );
}
