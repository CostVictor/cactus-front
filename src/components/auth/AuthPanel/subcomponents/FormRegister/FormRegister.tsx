import { useForm } from "react-hook-form";
import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";

import Modal from "@/components/display/Modal";
import TextField from "@/components/form/TextField";

import { userEP } from "@APISCMapping/endpoints";
import { cities, formatDataFormRegister } from "./formregister.variables";
import { useRouter } from "next/navigation";

const FormRegister = () => {
  const {
    info: { isLoading },
    actions: { fetchData },
  } = useRequest();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addNewModal, removeModal } = useModalActions();
  const router = useRouter();

  return (
    <form>
      <TextField name="Teste" label="Teste" control={control} />
    </form>
  );
};

export default FormRegister;
