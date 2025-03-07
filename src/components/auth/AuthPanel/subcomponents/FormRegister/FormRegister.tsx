import { useForm, FormProvider, FieldValues } from "react-hook-form";
import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";

import Modal from "@/components/display/Modal";
import Form from "@/components/form/Form";
import TextField from "@/components/form/TextField";
import FormattedField from "@/components/form/FormattedField";
import SelectField from "@/components/form/SelectField";
import Button from "@/components/form/Button";

import { userEP } from "@APISCMapping/endpoints";
import { cities, formatDataFormRegister } from "./formregister.variables";
import { useRouter } from "next/navigation";
import style from "./formregister.module.scss";

const FormRegister = () => {
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest<null>();

  const form = useForm();
  const { addNewModal, removeModal } = useModalActions();
  const router = useRouter();

  const handleSubmit = (data: FieldValues) => {
    fetchData({
      request: {
        url: userEP.register,
        method: "POST",
        data,
      },
      modalTitleWhenError: "Erro ao efetuar o cadastro",
      onSuccess: (response) =>
        addNewModal(
          <Modal
            title="Cadastro efetuado"
            buttons={[
              {
                text: "Ir ao login",
                appearance: "main",
                onClick: () => {
                  router.push("/login");
                  removeModal();
                },
              },
            ]}
            {...response.data}
          />
        ),
    });
  };

  return (
    <FormProvider {...form}>
      <Form
        id="FormRegister"
        onSubmit={handleSubmit}
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
                  "Por favor, defina um nome que facilite sua identificação.",
              },
            },
          }}
          required
        />
        <FormattedField name="tel" type="tel" label="Telefone" required />
        <TextField name="email" label="E-mail" type="email" required />
        <SelectField name="city" label="Cidade" options={cities} required />
        <TextField
          name="password"
          label="Senha"
          type="demanding-password"
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
                  value === form.watch("password") ||
                  "As senhas não coincidem.",
              },
            },
          }}
          required
        />
      </Form>
      <Button
        text="Criar conta"
        type="submit"
        formId="FormRegister"
        appearance="principal"
        isLoading={isLoading || form.formState.isSubmitting}
        largeMode="90%"
      />
    </FormProvider>
  );
};

export default FormRegister;
