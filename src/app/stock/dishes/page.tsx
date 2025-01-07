import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import NavStock from "@/components/navigation/NavStock";

export default function StockDishesPage() {
  return (
    <>
      <Header />
      <main>
        <Section id="stock_dishes" maxWidthContent>
          <NavStock local="dishes" />
          <hr className="division space" />
        </Section>
      </main>
      <Sidebar />
    </>
  );
}
