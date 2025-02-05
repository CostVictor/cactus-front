import { useFormContext } from "react-hook-form";
import { trimmerData, omitKeys, setFormatData } from "./form.utils";
import { PropsForm } from "./form.types";

const Form = ({
  children,
  onSubmit,

  outputData,
  className,
  style,
}: PropsForm) => {
  const { handleSubmit, getValues } = useFormContext();

  return (
    <form
      style={style}
      onChange={() => console.log(getValues())}
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
