"use client";

import React from "react";
import { motion } from "framer-motion";

import { enterChild } from "@/styles/animations";
import PropsContainer from "./container.types";
import { GridContainer } from "./container.styleds";

const Container = ({
  children,
  className,
  animateChildren,
  grid,
}: PropsContainer) => {
  const childrenArray = React.Children.toArray(children);

  // Aplica a animação na lista de child caso `animateChildren` seja verdadeiro.
  const childs = animateChildren
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
    : children;

  return grid ? (
    <GridContainer
      className={className}
      $columns={typeof grid === "boolean" ? 4 : grid}
    >
      {childs}
    </GridContainer>
  ) : (
    <div className={className}>{childs}</div>
  );
};

export default Container;
