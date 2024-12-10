import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";

import useModal from "@/hooks/context/useModal";
import useAuth from "@/hooks/context/useAuth";
import Modal from "@/components/display/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";

import { errorExtractor } from "@/hooks/network/useRequest";
import { filterDifferences } from "@/utils/filters";
import { revealGrow } from "@/styles/animations";
import { PropsSnack } from "./snack.types";
import { convertMoney } from "@/utils/formatters";
import style from "./snack.module.scss";

const Snack = (dataSnack: PropsSnack) => {
  const [data, setDataSnack] = useState(dataSnack);

  const formattedPrice = convertMoney(data.price);
  const formattedQuantity = data.quantity_in_stock.toString();
  const lowQuantityInStock = data.quantity_in_stock <= 5;

  const {
    actions: { safeFeth },
  } = useAuth();

  const {
    actions: { addNewModal, removeModal },
  } = useModal();

  const editSnack = () =>
    addNewModal(
      <Modal title={`Editar ${data.name}`} buttons={null} notOverflow>
        <div style={{ marginBottom: 5 }}>
          <Form
            onSubmit={(dataForm) => {
              const editedValues = filterDifferences(
                {
                  ...data,
                  price: formattedPrice,
                  quantity_in_stock: formattedQuantity,
                },
                dataForm
              );

              if (Object.keys(editedValues).length) {
                if ("price" in editedValues) {
                  // Converte o valor para numérico.
                  editedValues.price = convertMoney(editedValues.price, true);
                }

                safeFeth(
                  {
                    url: `snacks/${data.nameCategory}/${data.name}`,
                    method: "PATCH",
                    content: editedValues,
                  },
                  () => {
                    setDataSnack((prevValue) => ({
                      ...prevValue,
                      ...dataForm,
                    }));
                    removeModal(-1);
                  },
                  (err) =>
                    addNewModal(
                      <Modal
                        title="Erro ao Editar"
                        message={errorExtractor(err)}
                      />
                    )
                );
              } else {
                removeModal(-1);
              }
            }}
            defaultButtonSubmitText="Salvar"
            includeButton={{ text: "Cancelar", onClick: () => removeModal(-1) }}
          >
            <InputField
              name="name"
              label="Nome"
              config={{ validation: { capitalize: "all" } }}
              value={data.name}
              required
            />
            <InputField
              name="price"
              label="Preço"
              config={{ type: "price" }}
              value={formattedPrice}
              required
            />
            <InputField
              name="quantity_in_stock"
              label="Quantidade em estoque"
              config={{ type: "number" }}
              value={formattedQuantity}
              required
            />
            <InputField
              name="description"
              label="Descrição do item"
              value={data.description ?? ""}
            />
          </Form>
        </div>
      </Modal>
    );

  return (
    <motion.article
      variants={revealGrow}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={style.container_main}
      onClick={editSnack}
    >
      <div className={style.header}>
        <div className={style.container_info_stock}>
          <p>Em estoque:</p>
          {lowQuantityInStock && (
            <Icon
              className={style.icon}
              icon="material-symbols:warning-rounded"
            />
          )}
          <p
            style={
              lowQuantityInStock ? { color: "var(--red-tertiary)" } : undefined
            }
          >
            {data.quantity_in_stock}
          </p>
        </div>
        <Icon icon="majesticons:pencil-alt-line" />
      </div>

      <div className={style.body}>
        {data.path_img && (
          <Image
            className={style.img}
            src={data.path_img}
            alt={`Imagem do item ${name}.`}
            width={150}
            height={50}
          />
        )}

        <h3 className={style.title}>{data.name}</h3>
        <p className={style.price}>{formattedPrice}</p>
      </div>
    </motion.article>
  );
};

export default Snack;
