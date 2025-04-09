"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import clsx from "clsx";

import LabelController from "./subcomponents/LabelController";
import OptionsController from "./subcomponents/OptionsController";

import { folderAnimate, childFolderAnimate } from "./folder.variables";
import { PropsFolder } from "./folder.types";
import style from "./folder.module.scss";

const Folder = ({
  name,
  children,
  open,
  notification,
  config,
}: PropsFolder) => {
  // Configuração padrão da pasta.
  config = {
    canMinimize: true,
    expandUntil: "30rem",
    ...config,
  };
  const folderMarker = config.marker;

  const [isOpen, setIsOpen] = useState<boolean>(
    config.canMinimize ? open ?? false : true
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
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={clsx(style.container_main, {
        [style.open]: isOpen,
      })}
    >
      <div
        className={clsx(style.header, {
          [style.division_visible]: isOpen,
        })}
      >
        <div className={style.container_label}>
          {folderMarker ? (
            folderMarker.type === "icon" ? (
              <Icon className={style.icon} icon={folderMarker.appearance} />
            ) : (
              <Image
                alt={`Imagem da pasta ${name}.`}
                src={folderMarker.appearance}
                className={style.img}
                width={35}
                height={35}
              />
            )
          ) : undefined}

          <div className={style.info_local}>
            <h2 title={name}>{name}</h2>
            <LabelController labels={notification?.labels ?? []} />
          </div>
        </div>

        <OptionsController
          isFolderOpen={isOpen}
          toggleOpenFolder={toggleOpenFolder}
          folderConfig={config}
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
              <div
                className={style.content}
                style={{ maxHeight: config.expandUntil }}
              >
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default Folder;
