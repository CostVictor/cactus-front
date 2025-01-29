import useRequest from "@/hooks/network/useRequest";
import useModalActions from "@/hooks/context/useModal";

import Modal from "@/components/display/Modal";

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

  return <div></div>;
};

export default FormRegister;
