import { trimmerData, omitKeys, setFormatData } from "./form.utils";
import { PropsForm } from "./form.types";

const Form = ({ children, onSubmit, handleSubmit, outputData }: PropsForm) => {
  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit(
          setFormatData(
            trimmerData(omitKeys(data, "__notIncluded")),
            outputData
          )
        )
      )}
      noValidate
    >
      {children}
    </form>
  );
};

export default Form;
