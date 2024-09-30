import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.1 } }
};

export const revealGrow: Variants = {
  hidden: { opacity: 0, scaleX: 0.75 },
  visible: { opacity: 1, scaleX: 1 },
  exit: { opacity: 0, scaleX: 0.75, transition: { duration: 0.1 } },
}

export const enterChild: Variants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 }
}

export const float: Variants = {
  animate: (custom) => ({
    y: [0, -13, 0],
    rotate: [0, custom, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
}
