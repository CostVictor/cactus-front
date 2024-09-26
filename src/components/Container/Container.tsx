import PropsContainer from "./container.types";
import ChildObserver from "./subcomponents/ChildObserver";
import { motion } from "framer-motion";
import React, { useRef } from "react";

const Container = ({
  children,
  className,
  variants,
  isObserver,
}: PropsContainer) => {
  const childrenArray = React.Children.toArray(children);
  const containerRef = useRef(null);

  return (
    <motion.div
      ref={containerRef}
      className={className}
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {isObserver
        ? childrenArray.map((child, index) => (
            <ChildObserver key={index} containerRef={containerRef}>
              {child}
            </ChildObserver>
          ))
        : children}
    </motion.div>
  );
};

export default Container;
