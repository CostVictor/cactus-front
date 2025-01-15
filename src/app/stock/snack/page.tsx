import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import NavStock from "@/components/navigation/NavStock";
import StockSnack from "@/components/interface/StockSnack";

export default function StockSnackPage() {
  return (
    <>
      <Header />
      <main>
        <Section id="stock_snack" maxWidthContent>
          <NavStock local="snack" />
          <hr className="division space" />
          <StockSnack />
        </Section>
      </main>
      <Sidebar />
    </>
  );
}
