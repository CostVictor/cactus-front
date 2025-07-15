"use client";

import Sidebar from "@/components/navigation/Sidebar";
import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";

import Folder from "@/components/interface/Folder";
import useRequest from "@/hooks/network/useRequest";
import { BaseDish } from "@api/types/lunch";

import { Icon } from "@iconify/react";
import { apiHTTP } from "@api/endpoints";

import DataDish from "./_subcomponents/DataDish";

export default function LunchPage() {
  const { lunch } = apiHTTP;

  const {
    info: { data },
  } = useRequest<BaseDish[]>({
    initFetchData: {
      request: { url: lunch.baseUrl, method: "GET" },
    },
  });

  const date = new Date();
  const weekday = date.getDay() - 1;

  return (
    <>
      <Header />
      <main>
        {!!data && (
          <Section id="today" maxWidthContent>
            {[0, 1, 2, 3, 4].includes(weekday) ? (
              <Folder
                name={`Almoço de Hoje (${data[weekday].day_name})`}
                config={{ canMinimize: false, expandUntil: "100rem" }}
              >
                <DataDish dish={data[weekday]} canRedirect />
              </Folder>
            ) : (
              <span
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.35rem",
                  color: "var(--black-primary)",
                }}
              >
                <Icon icon="material-symbols:warning-rounded" />
                <p>
                  Pedidos de almoço só estarão disponíveis durante a semana.
                </p>
              </span>
            )}

            <p className="division space"></p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.3rem",
              }}
            >
              {data
                .filter((_, index) => index !== weekday)
                .map((dish) => (
                  <Folder
                    name={`Almoço de ${dish.day_name}`}
                    key={dish.day_name}
                    config={{ expandUntil: "100rem" }}
                  >
                    <DataDish dish={dish} />
                  </Folder>
                ))}
            </div>
          </Section>
        )}
      </main>
      <Sidebar />
    </>
  );
}
