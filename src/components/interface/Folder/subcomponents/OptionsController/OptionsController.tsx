import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";

import Button from "@/components/forms/Button";
import { fadeInFolder } from "./optionscontroller.variables";
import { PropsOptionsControler } from "./optionscontroller.types";
import style from "./optionscontroller.module.scss";

const OptionsController = ({
  isFolderOpen,
  toggleOpenFolder,
  folderConfig,
}: PropsOptionsControler) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { edit, canMinimize, addExtraOptions, button } = folderConfig;
  const shouldRenderOptions = edit || canMinimize || addExtraOptions || button;

  /**
   * Abre e fecha o menu da pasta.
   */
  const toggleMenu = () => setIsMenuOpen((prevValue) => !prevValue);

  return (
    shouldRenderOptions && (
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

        {(edit || addExtraOptions) && (
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
                    {addExtraOptions?.map((option, index) => (
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
                    {edit && (
                      <Icon
                        icon="majesticons:pencil-alt-line"
                        className={style.icon}
                        onClick={edit}
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
