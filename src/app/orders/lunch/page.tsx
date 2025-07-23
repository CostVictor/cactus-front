"use client";

import Link from "next/link";

import Sidebar from "@/components/navigation/Sidebar";
import Section from "@/components/layout/Section";
import Panel from "@/components/layout/Panel";
import Button from "@/components/form/Button";

import useWebSocket from "@/hooks/network/useWebSocket";
import { ws } from "@api/endpoints";
import { BaseOrder } from "@api/types/order";

import OrdersPanel from "../_subcomponents/OrdersPanel";

export default function OrdersLunchPage() {
  const { order } = ws;
  const { data } = useWebSocket<BaseOrder[]>(order.baseUrlLunch);

  return (
    <>
      <main>
        <Section id="ordersLunch" maxWidthContent>
          <Panel title="Pedidos">
            <div
              style={{
                display: "flex",
                padding: "1rem",
                gap: "2rem",
              }}
            >
              <Link href="/orders/snack">
                <Button text="Lanches" />
              </Link>
              <Button text="Almoços" appearance="principal" />
            </div>
          </Panel>

          <p className="division space"></p>
          {!!data && <OrdersPanel data={data} />}
        </Section>
      </main>
      <Sidebar />
    </>
  );
}
