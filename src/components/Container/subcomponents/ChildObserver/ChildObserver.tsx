import PropsChildObserver from "./childobserver.types";
import { useInView, motion } from "framer-motion";
import { enterChild } from "@/styles/animations";
import { useRef } from "react";

const ChildObserver = ({ children, containerRef }: PropsChildObserver) => {
  const childRef = useRef(null);
  const inView = useInView(childRef, { root: containerRef });

  return (
    <motion.div
      variants={enterChild}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: 0.1, duration: 0.15 }}
      ref={childRef}
    >
      {children}
    </motion.div>
  );
};

export default ChildObserver;
