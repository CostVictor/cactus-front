import { useState, useMemo } from "react";
import { Icon } from "@iconify/react";

import Grid from "@/components/layout/Grid";
import Folder from "@/components/interface/Folder";
import CardInfo from "@/components/display/CardInfo";

import FilterField from "@/components/form/FilterField";
import { filterOption } from "@/components/form/_shared/utils";

import { BaseOrder } from "@api/types/order";
import { PropsLabelFolder } from "@/components/interface/Folder/folder.types";

import { PropsOrdersPanel } from "./orderspanel.types";
import style from "./orderspanel.module.scss";

const OrdersPanel = ({ data }: PropsOrdersPanel) => {
  const [filteredName, setFilteredName] = useState("");

  const ordersFiltered = useMemo(() => {
    const filteredOptions = filterOption(
      filteredName,
      data.map((order) => order.user)
    );

    return data.filter((order) => filteredOptions.includes(order.user));
  }, [filteredName, data]);

  /**
   * Retorna uma lista de labels para o pedido.
   * As labels incluem informações sobre o tipo de pedido,
   * o valor devido e o status do pagamento.

   * @param order Pedido a ser verificado.
   * @returns Lista de labels para o pedido.
   */
  const getLabels = (order: BaseOrder) => {
    const labels = [] as PropsLabelFolder[];

    if (order.lunch.length) labels.push({ text: "Pedido de Almoço" });

    labels.push({ text: order.amount_due.formatted_amount });

    labels.push(
      !!order.final_payment_date
        ? { text: "Pago", type: "success" }
        : { text: "Pagamento Pendente", type: "pending" }
    );

    return labels;
  };

  return (
    <div className={style.container_main}>
      <div className={style.container_filter}>
        <span>
          <p>Quantidade de pedidos:</p>
          <p className={style.value}>{data.length}</p>
        </span>

        <FilterField
          name="filter"
          label="Filtrar por nome..."
          onChange={(text) => setFilteredName(text)}
        />
      </div>

      {!!ordersFiltered.length ? (
        ordersFiltered.map((order, orderIndex) => (
          <Folder
            key={orderIndex}
            name={order.user}
            config={{ canMinimize: false, expandUntil: "100rem" }}
            notification={{
              message: order.description,
              labels: getLabels(order),
            }}
          >
            {!!order.lunch.length && (
              <>
                <Grid>
                  {order.lunch.map((composition, compositionIndex) => (
                    <CardInfo
                      key={compositionIndex}
                      title={composition.ingredient_name}
                      text={
                        !!composition.quantity_ingredient
                          ? `Quantidade: ${composition.quantity_ingredient}`
                          : undefined
                      }
                    />
                  ))}
                </Grid>

                {!!order.snacks.length && (
                  <p className="marker">Complementos</p>
                )}
              </>
            )}

            {!!order.snacks.length && (
              <Grid>
                {order.snacks.map((snack, snackIndex) => (
                  <CardInfo
                    key={snackIndex}
                    title={snack.name}
                    text={`Quantidade: ${snack.quantity_product}`}
                  />
                ))}
              </Grid>
            )}
          </Folder>
        ))
      ) : (
        <span className={style.not_orders}>
          <Icon icon="material-symbols:warning-rounded" />
          {data.length && !ordersFiltered.length ? (
            <p>Nenhum pedido corresponde ao nome filtrado.</p>
          ) : (
            <p>Nenhum pedido foi encontrado.</p>
          )}
        </span>
      )}
    </div>
  );
};

export default OrdersPanel;
