import { useFormContext } from "react-hook-form";
import useRequest from "@/hooks/network/useRequest";

import SelectField from "@/components/form/SelectField";
import OptionsField from "@/components/form/OptionsField";

import { http } from "@api/endpoints";
import { PropsUserPanel } from "./usepanel.types";

const UserPanel = () => {
  const { watch } = useFormContext();
  const { user } = http;

  const {
    info: { data },
  } = useRequest<PropsUserPanel>({
    initFetchData: {
      request: { url: user.allUsers, method: "GET" },
      modalTitleWhenError: "Erro ao Carregar os Usuários",
    },
  });

  /**
   * Gera uma lista de opções de usuários para uso em componentes de interface.
   * Inclui o funcionário atual (applicant) como a primeira opção, seguido pelos clientes.
   */
  const getUsers = () => {
    const clients = data?.users || [];
    return [`Func. ${data?.applicant} (Você)`, ...clients];
  };

  return (
    !!data && (
      <>
        <SelectField
          name="username"
          label="Destinatário da compra"
          options={getUsers()}
          required
        />

        {watch("username") !== `Func. ${data.applicant} (Você)` && (
          <OptionsField
            name="wasPaid"
            label="O pedido já foi pago?"
            type="radio"
            options={[
              { name: "Sim", value: true },
              { name: "Não", value: false },
            ]}
            config={{ initChecked: false }}
            required
          />
        )}
      </>
    )
  );
};

export default UserPanel;
