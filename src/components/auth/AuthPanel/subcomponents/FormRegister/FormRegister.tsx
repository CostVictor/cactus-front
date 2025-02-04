import { useForm } from "react-hook-form";
import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";

import Modal from "@/components/display/Modal";
import Form from "@/components/form/Form/Form";
import TextField from "@/components/form/TextField";
import FormattedField from "@/components/form/FormattedField";

import { userEP } from "@APISCMapping/endpoints";
import { cities, formatDataFormRegister } from "./formregister.variables";
import { useRouter } from "next/navigation";
import style from "./formregister.module.scss";

const FormRegister = () => {
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest();

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { addNewModal, removeModal } = useModalActions();
  const router = useRouter();

  return (
    <Form
      onSubmit={(data) => console.log(data)}
      handleSubmit={handleSubmit}
      className={style.form}
    >
      <TextField
        name="username"
        label="Nome e sobrenome"
        control={control}
        message={
          errors.username
            ? { text: errors.username.message as string, isError: true }
            : undefined
        }
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
      <FormattedField
        name="tel"
        type="tel"
        label="Telefone"
        control={control}
        setValue={setValue}
        message={
          errors.tel
            ? { text: errors.tel.message as string, isError: true }
            : undefined
        }
        required
      />
      <TextField
        name="password"
        label="Senha"
        type="password"
        control={control}
        message={
          errors.password
            ? { text: errors.password.message as string, isError: true }
            : !getValues("password")
            ? {
                text: "A senha deve incluir pelo menos: 10 caracteres, uma letra maiúscula, uma letra minúscula, um número e um símbolo especial.",
              }
            : undefined
        }
        required
      />
      <TextField
        name="conf_password__notIncluded"
        label="Confirmar senha"
        type="password"
        control={control}
        message={
          errors.conf_password__notIncluded
            ? {
                text: errors.conf_password__notIncluded.message as string,
                isError: true,
              }
            : undefined
        }
        config={{
          valueRules: {
            custom: {
              confPassword: (value) =>
                value === watch("password") || "As senhas não coincidem",
            },
          },
        }}
        required
      />
      <button>Ok</button>
    </Form>
  );
};

export default FormRegister;
