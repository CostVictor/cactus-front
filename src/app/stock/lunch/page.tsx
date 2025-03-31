import Link from "next/link";

import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import StockLunch from "@/components/interface/StockLunch";

import Panel from "@/components/layout/Panel";
import Button from "@/components/form/Button";

export default function StockLunchPage() {
  return (
    <>
      <Header />
      <main>
        <Section id="stock_lunch" maxWidthContent>
          <Panel title="Estoques" bgDark>
            <div
              style={{
                display: "flex",
                padding: "1rem",
                gap: "2rem",
              }}
            >
              <Link href="/stock/snack">
                <Button text="Lanches" />
              </Link>
              <Button text="Almoços" appearance="principal" />
            </div>
          </Panel>
          <hr className="division space" />
          <StockLunch />
        </Section>
      </main>
      <Sidebar />
    </>
  );
}
