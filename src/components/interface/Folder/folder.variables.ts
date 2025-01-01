import { Variants } from "framer-motion"

export const folderAnimate: Variants = {
  close: { height: 0, transition: { delay: 0.05 } },
  open: { height: "auto" }
}

export const childFolderAnimate: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1 }
}
