import { Variants } from "framer-motion";

export const animateLabel: Variants = {
  hidden: { x: "-0.5rem", opacity: 0, transition: { duration: 0.15 } },
  visible: { x: 0, opacity: 1, translateY: "-50%" }
}
