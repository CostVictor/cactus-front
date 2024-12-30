"use client";

import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import Sidebar from "@/components/navigation/Sidebar";
import NavStock from "@/components/navigation/NavStock";

export default function StockSnacks() {
  return (
    <>
      <Header />
      <main>
        <Section id="stock_snacks" maxWidthContent>
          <NavStock local="snacks" />
          <hr className="division space" />
          {/* <div className={style.container_sessions}>
            {Array.isArray(stockSnacks) && stockSnacks.length > 0 ? (
              stockSnacks.map((category, index) => (
                <Folder
                  key={index}
                  name={category.name}
                  description={category.description}
                  folderConfig={{
                    marker: {
                      appearance: "mingcute:storage-fill",
                      type: "icon",
                    },
                  }}
                  notification={
                    category.snacks.filter(
                      (snack) => snack.quantity_in_stock <= 5
                    ).length
                      ? {
                          labels: [
                            { text: "Produtos se esgotando", type: "alert" },
                          ],
                        }
                      : undefined
                  }
                >
                  <SnackPanel
                    nameCategory={category.name}
                    snacks={category.snacks}
                  />
                </Folder>
              ))
            ) : (
              <div className={style.not_categories}>
                <Icon icon="majesticons:information-circle-line"></Icon>
                <p>Nenhuma categoria foi encontrada</p>
              </div>
            )}
          </div>
          <AddCategory setStockSnacks={setStockSnacks} /> */}
        </Section>
      </main>
      <Sidebar />
    </>
  );
}
