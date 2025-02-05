import { useForm, FormProvider } from "react-hook-form";
import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";

import Modal from "@/components/display/Modal";
import Form from "@/components/form/Form/Form";
import TextField from "@/components/form/TextField";
import FormattedField from "@/components/form/FormattedField";
import SelectField from "@/components/form/SelectField";

import { userEP } from "@APISCMapping/endpoints";
import { cities, formatDataFormRegister } from "./formregister.variables";
import { useRouter } from "next/navigation";
import style from "./formregister.module.scss";

const FormRegister = () => {
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest();

  const formMethods = useForm();

  const { addNewModal, removeModal } = useModalActions();
  const router = useRouter();

  return (
    <FormProvider {...formMethods}>
      <Form
        onSubmit={(data) => console.log(data)}
        outputData={formatDataFormRegister}
        className={style.form}
      >
        <TextField
          name="username"
          label="Nome e sobrenome"
          config={{
            writing: {
              capitalize: "all",
              rules: { notNumber: true, notSymbol: true },
            },
            valueRules: {
              custom: {
                name: (value) =>
                  value.length >= 10 ||
                  "Por favor, defina um nome que facilite sua identificação",
              },
            },
          }}
          required
        />
        <FormattedField name="tel" type="tel" label="Telefone" required />
        <SelectField name="city" label="Cidade" options={cities} required />
        <TextField
          name="password"
          label="Senha"
          type="password"
          message="A senha deve incluir pelo menos: 12 caracteres, uma letra maiúscula, 
          uma letra minúscula, um número e um símbolo especial."
          required
        />
        <TextField
          name="conf_password__notIncluded"
          label="Confirmar senha"
          type="password"
          config={{
            valueRules: {
              custom: {
                confPassword: (value) =>
                  value === formMethods.watch("password") ||
                  "As senhas não coincidem",
              },
            },
          }}
          required
        />
        <button>Ok</button>
      </Form>
    </FormProvider>
  );
};

export default FormRegister;
