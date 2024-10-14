"use client";

import React from "react";
import { motion } from "framer-motion";

import { enterChild } from "@/styles/animations";
import PropsContainer from "./container.types";
import style from "./container.module.scss";

const Container = ({
  children,
  className,
  animateChildren,
  grid,
}: PropsContainer) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={grid ? style.grid : className}>
      {animateChildren
        ? childrenArray.map((child, index) => (
            <motion.div
              key={index}
              variants={enterChild}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.15 }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </div>
  );
};

export default Container;
