import { ReactElement } from "react"
import { PropsInputField } from "../InputField"
import { FieldErrors, FieldValues } from "react-hook-form"

/**
 * Adiciona "..._remove" no identificador único do input caso seja um campo de confirmação.
 * @param name Identificador único do input.
 * @param iqualTo Texto que define qual deverá ser o valor final do input.
 * @returns Texto marcado com "..._remove" caso seja um input de confirmação.
 */
export const checkHasInputConfirm = (name: string, equalTo: string) => {
  return `${name}${equalTo ? "_remove" : ""}`;
};


/**
 * Verifica a existência de mensagens de erro relacionada ao input e retorna a mensagem.
 * @param child Componente React InputField.
 * @param errors Objeto com os erros fornecidos pela lib react-hook-form.
 * @returns Configuração com as informações da mensagem do input.
 */
export const getFormMessage = (child: ReactElement<PropsInputField>, errors: FieldErrors<FieldValues>) => {
  const nameCurrent = checkHasInputConfirm(child.props.name, child.props.equalTo ?? "");
  const textErrorCurrent = errors[nameCurrent]?.message?.toString();

  const textProvided = child.props.message?.text ?? "";
  const errorProvided = child.props.message?.isError ?? false;

  const textCurrent = textErrorCurrent ? textErrorCurrent : textProvided;
  const isError = textErrorCurrent ? true : errorProvided;

  return {
    text: textCurrent,
    isError: isError,
  }
};
