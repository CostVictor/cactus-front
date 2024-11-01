import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";

import Container from "@/components/layout/Container";

import { folderAnimate, childFolderAnimate } from "./folder.variables";
import { PropsFolder } from "./folder.types";
import style from "./folder.module.scss";

const Folder = ({
  name,
  message,
  isMinimized = true,
  canMinimize = true,
}: PropsFolder) => {
  const [minimized, setMinimized] = useState<boolean>(
    canMinimize ? isMinimized : false
  );

  const controlAnimateContent = useAnimation();
  const animating = useRef<boolean>(false);

  /**
   * Abre ou fecha a pasta dependendo de seu estado.
   */
  const toggleMinimizeFolder = () => {
    if (!animating.current) {
      // Bloqueia temporariamente a capacidade de fechar/abrir.
      animating.current = true;
      setMinimized((prevValue) => !prevValue);
    }
  };

  return (
    <section className={style.container_main}>
      <div
        className={`${style.header} ${
          !minimized && style.division_visible
        }`.trim()}
      >
        <h2>{name}</h2>

        <div className={style.container_options}>
          {canMinimize && (
            <Icon
              className={style.icon}
              onClick={toggleMinimizeFolder}
              icon={
                minimized
                  ? "material-symbols:arrow-right-rounded"
                  : "material-symbols:arrow-drop-down-rounded"
              }
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {!minimized && (
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
              {message && <p className={style.span_message}>{message}</p>}
              <Container className={style.content}>
                <p>Conteúdo</p>
                <p>Conteúdo</p>
                <p>Conteúdo</p>
              </Container>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Folder;
