import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import { apiHTTP } from "@api/endpoints";

const AddIngredient = () => {
  const { removeModal } = useModalActions();
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  return (
    <Modal title="Adicionar Ingrediente" notOverflow>
      <div style={{ marginBottom: 5 }}>
        {/* <Form
          onSubmit={(data) =>
            fetchData({
              request: {
                url: stockLunchEP.baseIngredient,
                method: "POST",
                data,
              },
              onSuccess: () => removeModal(-1),
            })
          }
          includeButton={{ text: "Cancelar", onClick: () => removeModal(-1) }}
          defaultButtonSubmitText="Criar"
          isLoading={isLoading}
        >
          <InputField
            name="name"
            label="Nome"
            config={{ validation: { capitalize: "all" } }}
            required
          />

          <p className="marker">
            Você pode permitir que o cliente peça acrescentado
          </p>
          <InputField
            name="additional_charge"
            label="Valor por acrescimo"
            config={{ type: "price", validation: { freeValue: true } }}
          />
        </Form> */}
      </div>
    </Modal>
  );
};

export default AddIngredient;
