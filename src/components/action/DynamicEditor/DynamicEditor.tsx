"use client";

import { motion } from "framer-motion";

import { fadeIn, revealGrow } from "@/styles/animations";
import { DynamicEditorProps } from "./dynamiceditor.types";
import style from "./dynamiceditor.module.scss";

const DynamicEditor = ({ children, title, img }: DynamicEditorProps) => {
  return (
    <motion.article
      className={style.container}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        type: "spring",
        stiffness: 700,
        damping: 23,
      }}
    >
      <motion.div
        layout
        className={style.body}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 55,
        }}
      >
        <div className={style.header}>
          <motion.h2
            key={`title_edit_${title}`}
            variants={revealGrow}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h2>
        </div>
        <div className={style.content}>{children}</div>
      </motion.div>
    </motion.article>
  );
};

export default DynamicEditor;
