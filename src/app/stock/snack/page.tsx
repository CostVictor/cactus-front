import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import NavStock from "@/components/navigation/NavStock";
import StockSnacks from "@/components/interface/StockSnacks";

export default function StockSnackPage() {
  return (
    <>
      <Header />
      <main>
        <Section id="stock_snack" maxWidthContent>
          <NavStock local="snack" />
          <hr className="division space" />
          <StockSnacks />
        </Section>
      </main>
      <Sidebar />
    </>
  );
}
