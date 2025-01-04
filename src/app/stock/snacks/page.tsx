import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import NavStock from "@/components/navigation/NavStock";
import StockSnacks from "@/components/interface/StockSnacks";

export default function StockSnacksPage() {
  return (
    <>
      <Header />
      <main>
        <Section id="stock_snacks" maxWidthContent>
          <NavStock local="snacks" />
          <hr className="division space" />
          <StockSnacks />
        </Section>
      </main>
      <Sidebar />
    </>
  );
}
