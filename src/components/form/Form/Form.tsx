import { useFormContext } from "react-hook-form";
import { trimmerData, omitKeys, setFormatData } from "./form.utils";
import { PropsForm } from "./form.types";

const Form = ({
  id,
  children,
  onSubmit,
  outputData,
  className,
  style,
}: PropsForm) => {
  const { handleSubmit } = useFormContext();

  return (
    <form
      id={id}
      style={style}
      className={className}
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
