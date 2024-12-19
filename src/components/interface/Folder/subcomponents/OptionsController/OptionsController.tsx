import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";

import useAuth from "@/hooks/context/useAuth";
import useModal from "@/hooks/context/useModal";
import Modal from "@/components/display/Modal";

import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import Button from "@/components/forms/Button";

import { filterDifferences } from "@/utils/filters";
import { errorExtractor } from "@/hooks/network/useRequest";

import { fadeInFolder } from "./optionscontroller.variables";
import { PropsOptionsControler } from "./optionscontroller.types";
import style from "./optionscontroller.module.scss";

const OptionsController = ({
  nameCategory,
  descriptionCategory,
  isFolderOpen,
  toggleOpenFolder,
  folderConfig,
}: PropsOptionsControler) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { canEdit, canMinimize, addExtraOptions, button } = folderConfig;

  const {
    actions: { safeFeth },
  } = useAuth();

  const {
    actions: { addNewModal, removeModal },
  } = useModal();

  /**
   * Abre e fecha o menu da pasta.
   */
  const toggleMenu = () => setIsMenuOpen((prevValue) => !prevValue);

  /**
   * Abre um modal para editar uma categoria existente.
   *
   * O modal contém um formulário com campos para editar o nome e a descrição da categoria.
   * Os valores são filtrados para apenas aqueles que foram modificados.
   * Uma requisição HTTP PATCH é enviada para salvar as alterações, e após a conclusão bem-sucedida,
   * um modal de confirmação é exibido. Em caso de erro, um modal de erro é exibido.
   * Se não houver alterações, o modal é fechado sem salvar.
   *
   * @returns {void}
   */
  const editCategory = (): void =>
    addNewModal(
      <Modal title={`Editar ${nameCategory}`} buttons={null} notOverflow>
        <div style={{ marginBottom: 5 }}>
          <Form
            formatData={[
              "name",
              { name: "update_description", format: ["title", "text"] },
            ]}
            onSubmit={(dataForm) => {
              const editedValues = filterDifferences(
                { name: nameCategory, update_description: descriptionCategory },
                dataForm
              );

              console.log(editedValues);

              if (Object.keys(editedValues).length) {
                safeFeth(
                  {
                    url: `snacks/${nameCategory}`,
                    method: "PATCH",
                    content: editedValues,
                  },
                  () => {
                    addNewModal(
                      <Modal
                        title={`${nameCategory} editada com sucesso`}
                        message="Por favor, recarregue a página para aplicar as alterações."
                      />
                    );
                    removeModal(-2);
                  },
                  (err) =>
                    addNewModal(
                      <Modal
                        title="Erro ao Editar"
                        message={errorExtractor(err)}
                      />
                    )
                );
              } else {
                removeModal(-1);
              }
            }}
            defaultButtonSubmitText="Salvar"
            includeButton={{ text: "Cancelar", onClick: () => removeModal(-1) }}
          >
            <InputField
              name="name"
              label="Nome"
              config={{ validation: { capitalize: "all" } }}
              value={nameCategory}
              required
            />
            <InputField
              name="title"
              label="Título da descrição"
              value={descriptionCategory ? descriptionCategory.title : ""}
              required
            />
            <InputField
              name="text"
              label="Texto da descrição"
              value={descriptionCategory ? descriptionCategory.text : ""}
              required
            />
          </Form>
        </div>
      </Modal>
    );

  return (
    (canEdit || canMinimize || addExtraOptions || button) && (
      <div className={`${style.container_main}`}>
        <AnimatePresence>
          {button && isFolderOpen && !isMenuOpen && (
            <motion.div
              className={style.container_button}
              variants={fadeInFolder}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Button
                text={button.text}
                onClick={button.onClick}
                appearance="main"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {(canEdit || addExtraOptions) && (
          <>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className={style.container_menu}
                  variants={fadeInFolder}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                >
                  <div className={style.options}>
                    {addExtraOptions &&
                      addExtraOptions.length > 0 &&
                      addExtraOptions.map((option, index) => (
                        <Icon
                          key={index}
                          className={style.icon}
                          onClick={option.onClick}
                          icon={option.icon}
                          style={{
                            color: `var(--${
                              option.color !== "normal" ? option.color : "gray"
                            }-primary)`,
                          }}
                        />
                      ))}
                    {canEdit && (
                      <Icon
                        icon="majesticons:pencil-alt-line"
                        className={style.icon}
                        onClick={editCategory}
                      />
                    )}
                  </div>
                  <Icon
                    icon="ci:close-sm"
                    className={style.icon}
                    onClick={toggleMenu}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {!isMenuOpen && (
              <motion.div
                className={`${style.icon} ${style.type_option}`}
                onClick={toggleMenu}
              >
                <Icon icon="mi:options-vertical" className={style.icon} />
              </motion.div>
            )}
          </>
        )}

        {canMinimize && !isMenuOpen && (
          <Icon
            className={style.icon}
            onClick={toggleOpenFolder}
            icon={
              isFolderOpen
                ? "material-symbols:arrow-drop-down-rounded"
                : "material-symbols:arrow-right-rounded"
            }
          />
        )}
      </div>
    )
  );
};

export default OptionsController;
