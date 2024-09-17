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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
              padding: 10,
              backgroundColor: "#C9C9C9",
              borderRadius: 10,
            }}
          >
            <span style={{ padding: 10 }}>Texto</span>
            <span style={{ padding: 10 }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
              illo, adipisci reprehenderit eius tempore velit corrupti nisi
              nesciunt voluptate deleniti obcaecati quaerat sequi dolorem error
              animi, similique aliquid totam quas.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
              padding: 10,
              backgroundColor: "#C9C9C9",
              borderRadius: 10,
            }}
          >
            <span style={{ padding: 10 }}>Texto</span>
            <span style={{ padding: 10 }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
              illo, adipisci reprehenderit eius tempore velit corrupti nisi
              nesciunt voluptate deleniti obcaecati quaerat sequi dolorem error
              animi, similique aliquid totam quas.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
              padding: 10,
              backgroundColor: "#C9C9C9",
              borderRadius: 10,
            }}
          >
            <span style={{ padding: 10 }}>Texto</span>
            <span style={{ padding: 10 }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
              illo, adipisci reprehenderit eius tempore velit corrupti nisi
              nesciunt voluptate deleniti obcaecati quaerat sequi dolorem error
              animi, similique aliquid totam quas.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
              padding: 10,
              backgroundColor: "#C9C9C9",
              borderRadius: 10,
            }}
          >
            <span style={{ padding: 10 }}>Texto</span>
            <span style={{ padding: 10 }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
              illo, adipisci reprehenderit eius tempore velit corrupti nisi
              nesciunt voluptate deleniti obcaecati quaerat sequi dolorem error
              animi, similique aliquid totam quas.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
              padding: 10,
              backgroundColor: "#C9C9C9",
              borderRadius: 10,
            }}
          >
            <span style={{ padding: 10 }}>Texto</span>
            <span style={{ padding: 10 }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
              illo, adipisci reprehenderit eius tempore velit corrupti nisi
              nesciunt voluptate deleniti obcaecati quaerat sequi dolorem error
              animi, similique aliquid totam quas.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
              padding: 10,
              backgroundColor: "#C9C9C9",
              borderRadius: 10,
            }}
          >
            <span style={{ padding: 10 }}>Texto</span>
            <span style={{ padding: 10 }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
              illo, adipisci reprehenderit eius tempore velit corrupti nisi
              nesciunt voluptate deleniti obcaecati quaerat sequi dolorem error
              animi, similique aliquid totam quas.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
              padding: 10,
              backgroundColor: "#C9C9C9",
              borderRadius: 10,
            }}
          >
            <span style={{ padding: 10 }}>Texto</span>
            <span style={{ padding: 10 }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
              illo, adipisci reprehenderit eius tempore velit corrupti nisi
              nesciunt voluptate deleniti obcaecati quaerat sequi dolorem error
              animi, similique aliquid totam quas.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
              padding: 10,
              backgroundColor: "#C9C9C9",
              borderRadius: 10,
            }}
          >
            <span style={{ padding: 10 }}>Texto</span>
            <span style={{ padding: 10 }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
              illo, adipisci reprehenderit eius tempore velit corrupti nisi
              nesciunt voluptate deleniti obcaecati quaerat sequi dolorem error
              animi, similique aliquid totam quas.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
              padding: 10,
              backgroundColor: "#C9C9C9",
              borderRadius: 10,
            }}
          >
            <span style={{ padding: 10 }}>Texto</span>
            <span style={{ padding: 10 }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
              illo, adipisci reprehenderit eius tempore velit corrupti nisi
              nesciunt voluptate deleniti obcaecati quaerat sequi dolorem error
              animi, similique aliquid totam quas.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
              padding: 10,
              backgroundColor: "#C9C9C9",
              borderRadius: 10,
            }}
          >
            <span style={{ padding: 10 }}>Texto</span>
            <span style={{ padding: 10 }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
              illo, adipisci reprehenderit eius tempore velit corrupti nisi
              nesciunt voluptate deleniti obcaecati quaerat sequi dolorem error
              animi, similique aliquid totam quas.
            </span>
          </div>
        </Modal>
      );
    },
  };

  return (
    <>
      <Header targets={targets} />
      <main style={{ display: "flex", width: "100%" }}>
        <Button
          text="Abrir Modal"
          cssStyle={{ margin: " 30px auto" }}
          onClick={() => {
            modals.addNewModal(
              <Modal
                title="Testando Funcionamento"
                buttons={[botaoVoltar, botaoProximo]}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit corporis debitis nostrum, adipisci dolorum
                  tenetur autem excepturi voluptatum labore ad, possimus
                  recusandae laboriosam explicabo quas voluptas. Amet excepturi
                  odit itaque.
                </p>
              </Modal>
            );
          }}
        />
      </main>
      <Aside />
    </>
  );
}
