import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";

import Modal from "@/components/display/Modal";
import Form from "@/components/forms/Form";
import TextField from "@/components/forms/Inputs/TextField";

import { userEP } from "@APISCMapping/endpoints";
import { cities, formatDataFormRegister } from "./formregister.variables";
import { useRouter } from "next/navigation";

const FormRegister = () => {
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest();

  const { addNewModal, removeModal } = useModalActions();
  const router = useRouter();

  return (
    <Form onSubmit={() => console.log("ok")}>
      <TextField name="name" label="Teste" />
      {/* <InputField
        name="username"
        label="Nome e sobrenome"
        config={{
          validation: {
            capitalize: "all",
            notNumber: true,
            notSymbol: true,
          },
        }}
        required
      />
      <InputField
        name="tel"
        label="Telefone"
        config={{ type: "tel" }}
        required
      />
      <InputField
        name="email"
        label="E-mail"
        config={{ type: "email" }}
        required
      />
      <InputField
        name="city"
        label="Cidade"
        options={{ selectOptions: cities }}
        config={{ validation: { capitalize: "all" } }}
        required
      />
      <InputField
        name="password"
        label="Senha"
        config={{ type: "password" }}
        message={{
          text: "A senha deve incluir pelo menos: uma letra maiúscula, uma letra minúscula, um número e um símbolo especial.",
        }}
        required
      />
      <InputField
        name="password_conf"
        label="Confirmar senha"
        config={{ type: "password" }}
        equalTo="password"
        required
      /> */}
    </Form>
  );
};

export default FormRegister;
