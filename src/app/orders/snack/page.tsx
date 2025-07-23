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

export default function OrdersSnackPage() {
  const { order } = ws;
  const { data } = useWebSocket<BaseOrder[]>(order.baseUrlSnack);

  return (
    <>
      <main>
        <Section id="ordersSnack" maxWidthContent>
          <Panel title="Pedidos">
            <div
              style={{
                display: "flex",
                padding: "1rem",
                gap: "2rem",
              }}
            >
              <Button text="Lanches" appearance="principal" />
              <Link href="/orders/lunch">
                <Button text="Almoços" />
              </Link>
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
