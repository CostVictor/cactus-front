import { Variants } from "framer-motion"

export const animateSpanLabel: Variants = {
  hidden: { y: 5, opacity: 0.2 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.2 } },
  exit: { y: 5, opacity: 0.2, transition: { duration: 0.1 } }
}

export const animateLabel: Variants = {
  hidden: { x: "-0.5rem", opacity: 0, translateY: "-50%", transition: { duration: 0.15 } },
  visible: { x: 0, opacity: 1, translateY: "-50%" }
}
