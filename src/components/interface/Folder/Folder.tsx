import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useRef, useState } from "react";

import Container from "@/components/layout/Container";
import LabelController from "./subcomponents/LabelController";
import OptionsController from "./subcomponents/OptionsController";

import { folderAnimate, childFolderAnimate } from "./folder.variables";
import { PropsFolder } from "./folder.types";
import style from "./folder.module.scss";

const Folder = ({
  name,
  children,
  notification,
  open,
  internal,
  folderConfig = {
    canMinimize: true,
    expandUntil: "20rem",
  },
}: PropsFolder) => {
  const [isOpen, setIsOpen] = useState<boolean>(
    folderConfig.canMinimize ? open ?? false : true
  );

  const controlAnimateContent = useAnimation();
  const animating = useRef<boolean>(false);

  /**
   * Abre ou fecha a pasta dependendo de seu estado.
   */
  const toggleOpenFolder = () => {
    if (!animating.current) {
      // Bloqueia temporariamente a capacidade de fechar/abrir.
      animating.current = true;
      setIsOpen((prevValue) => !prevValue);
    }
  };

  return (
    <article
      className={`${style.container_main} ${
        internal ? style.internal : isOpen ? style.open : ""
      }`.trim()}
    >
      <div
        className={`${style.header} ${isOpen && style.division_visible}`.trim()}
      >
        <h2>{name}</h2>
        <LabelController labels={notification?.labels ?? []} />
        <OptionsController
          toggleOpenFolder={toggleOpenFolder}
          isOpen={isOpen}
          config={folderConfig}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={style.body}
            variants={folderAnimate}
            initial="close"
            animate="open"
            exit="close"
            onAnimationStart={() => controlAnimateContent.start("hidden")}
            onAnimationComplete={() => {
              controlAnimateContent.start("visible");
              animating.current = false;
            }}
          >
            <motion.div
              variants={childFolderAnimate}
              initial="hidden"
              animate={controlAnimateContent}
              style={{ width: "100%" }}
            >
              {notification?.message && (
                <p className={style.span_message}>{notification.message}</p>
              )}
              <Container
                className={style.content}
                style={{ maxHeight: folderConfig.expandUntil }}
              >
                {children}
              </Container>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default Folder;
