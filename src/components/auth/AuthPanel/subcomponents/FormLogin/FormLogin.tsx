import { useAuthActions } from "@/hooks/context/useAuth";
import useModalActions from "@/hooks/context/useModal";

import Modal from "@/components/display/Modal";
import Form from "@/components/forms/Form";
import NavLink from "@/components/navigation/NavLink";

import { useSearchParams } from "next/navigation";
import style from "./formlogin.module.scss";

const FormLogin = () => {
  const {
    network: { isLoading },
    actions: { login },
  } = useAuthActions();

  const { addNewModal } = useModalActions();
  const paramsURL = useSearchParams();

  return (
    // <Form
    //   defaultButtonSubmitText="Entrar"
    //   isLoading={isLoading}
    //   onSubmit={(data) => {
    //     const redirectTo = paramsURL.get("redirectTo");
    //     const { email, password } = data;
    //     login(email, password, redirectTo ?? "/");
    //   }}
    // >
    //   <InputField
    //     name="email"
    //     label="E-mail"
    //     config={{ type: "email" }}
    //     options={{ icon: "lucide:circle-user-round" }}
    //     required
    //   />
    //   <InputField
    //     name="password"
    //     label="Senha"
    //     config={{ type: "password" }}
    //     options={{ icon: "uil:lock-alt" }}
    //     required
    //   />
    //   <div className={style.container_options}>
    //     <NavLink
    //       text="Esqueci minha senha"
    //       link=""
    //       onClick={() =>
    //         addNewModal(
    //           <Modal
    //             title="Função indisponível"
    //             message="Esta funcionalidade ainda está em desenvolvimento."
    //           />
    //         )
    //       }
    //     />
    //   </div>
    // </Form>
    <div></div>
  );
};

export default FormLogin;
