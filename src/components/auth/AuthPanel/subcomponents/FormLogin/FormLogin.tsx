import { useForm, FormProvider } from "react-hook-form";
import { useAuthActions } from "@/hooks/context/useAuth";
import useModalActions from "@/hooks/context/useModal";

import Modal from "@/components/display/Modal";
import NavLink from "@/components/navigation/NavLink";

import Form from "@/components/form/Form";
import TextField from "@/components/form/TextField";
import Button from "@/components/form/Button";

import { useSearchParams } from "next/navigation";
import style from "./formlogin.module.scss";

const FormLogin = () => {
  const {
    network: { isLoading },
    actions: { login },
  } = useAuthActions();

  const { addNewModal } = useModalActions();
  const paramsURL = useSearchParams();

  const form = useForm();

  return (
    <FormProvider {...form}>
      <Form
        className={style.form}
        onSubmit={(data) => {
          const redirectTo = paramsURL.get("redirectTo");
          const { email, password } = data;
          login(email, password, redirectTo || "/");
        }}
      >
        <TextField
          name="email"
          label="E-mail"
          type="email"
          config={{ icon: "lucide:circle-user-round" }}
          required
        />
        <TextField
          name="password"
          label="Senha"
          type="password"
          config={{ icon: "uil:lock-alt" }}
          required
        />
        <div className={style.container_options}>
          <NavLink
            text="Esqueci minha senha"
            link=""
            onClick={() =>
              addNewModal(
                <Modal
                  title="Função indisponível"
                  message="Esta funcionalidade ainda está em desenvolvimento."
                />
              )
            }
          />
        </div>
        <Button
          text="Entrar"
          appearance="principal"
          isLoading={form.formState.isSubmitting || isLoading}
          largeMode
        />
      </Form>
    </FormProvider>
  );
};

export default FormLogin;
