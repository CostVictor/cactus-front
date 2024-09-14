"use client";

import Aside from "@/components/Aside";
import Header from "@/components/Header";

import Button from "@/components/Button";
import useModal from "@/hooks/context/useModal";
import Modal from "@/components/Modal";

export default function Home() {
  const modals = useModal();

  const targets = [
    { text: "Início", link: "#inicio" },
    { text: "Salgados", link: "#salgados" },
  ];

  const botaoVoltar = {
    text: "Fechar",
    onClick: () => {
      modals.removeModal(-1);
    },
  };

  const botaoProximo = {
    text: "Abrir outro",
    aparence: "main",
    onClick: () => {
      modals.addNewModal(
        <Modal title="Modal 2" defaultButtonText="Voltar">
          <p>Conteúdo 2</p>
        </Modal>
      );
    },
  };

  return (
    <>
      <Header targets={targets} />
      <main>
        <Button
          text="Abrir Modal"
          cssStyle={{ margin: "auto" }}
          onClick={() => {
            modals.addNewModal(
              <Modal
                title="Testando Funcionamento"
                buttons={[botaoVoltar, botaoProximo]}
              >
                <p>Conteúdo</p>
              </Modal>
            );
          }}
        />
      </main>
      <Aside />
    </>
  );
}
