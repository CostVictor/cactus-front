import Link from "next/link";

import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import StockSnack from "@/components/interface/StockSnack";

import Panel from "@/components/layout/Panel";
import Button from "@/components/form/Button";

export default function StockSnackPage() {
  return (
    <>
      <Header />
      <main>
        <Section id="stock_snack" maxWidthContent>
          <Panel title="Estoques" bgDark>
            <div
              style={{
                display: "flex",
                padding: "1rem",
                gap: "2rem",
              }}
            >
              <Button text="Lanches" appearance="principal" />
              <Link href="/stock/lunch">
                <Button text="Almoços" />
              </Link>
            </div>
          </Panel>
          <hr className="division space" />
          <StockSnack />
        </Section>
      </main>
      <Sidebar />
    </>
  );
}
