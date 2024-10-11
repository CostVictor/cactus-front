import { Variants } from "framer-motion"

export const animateSpan: Variants = {
  hidden: { y: 5, opacity: 0.2 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.2 } },
  exit: { y: 5, opacity: 0.2, transition: { duration: 0.1 } }
}
