import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";

import { PropsOptionsControler } from "./optionscontroller.types";
import style from "./optionscontroller.module.scss";

const OptionsController = ({
  toggleOpenFolder,
  isOpen,
  config,
}: PropsOptionsControler) => {
  const [open, setOpen] = useState<boolean>(false);
  const { canEdit, canMinimize, addExtraOptions } = config;

  /**
   * Abre e fecha o menu da pasta.
   */
  const toggleMenu = () => setOpen((prevValue) => !prevValue);

  return (
    <div className={style.container_main}>
      {(canEdit || addExtraOptions) && (
        <>
          <AnimatePresence>
            {open && (
              <motion.div
                className={style.container_menu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
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

          <motion.div
            className={`${style.icon} ${style.type_option}`}
            onClick={toggleMenu}
          >
            <Icon icon="mi:options-vertical" className={style.icon} />
          </motion.div>
        </>
      )}

      {canMinimize && (
        <Icon
          className={style.icon}
          onClick={toggleOpenFolder}
          icon={
            isOpen
              ? "material-symbols:arrow-drop-down-rounded"
              : "material-symbols:arrow-right-rounded"
          }
        />
      )}
    </div>
  );
};

export default OptionsController;
