import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import NavStock from "@/components/navigation/NavStock";
import StockLunch from "@/components/interface/StockLunch";

export default function StockLunchPage() {
  return (
    <>
      <Header />
      <main>
        <Section id="stock_lunch" maxWidthContent>
          <NavStock local="lunch" />
          <hr className="division space" />
          <StockLunch />
        </Section>
      </main>
      <Sidebar />
    </>
  );
}
