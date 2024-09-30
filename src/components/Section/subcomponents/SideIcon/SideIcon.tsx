import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { listIcons, lodash } from "./sideicon.variables";
import { PropsSideIcon } from "./sideicon.types";
import { float } from "@/styles/animations";
import style from "./sideicon.module.scss";

const SideIcon = ({ position }: PropsSideIcon) => {
  const [randomValue, setRandomValue] = useState<string>("");

  useEffect(() => {
    const iconRandom = lodash.sample(listIcons);
    setRandomValue(iconRandom);
  }, []);

  return (
    randomValue && (
      <motion.div
        variants={float}
        animate="animate"
        custom={position === "left" ? 2 : -2}
        style={{ rotateY: position === "left" ? 180 : 0 }}
        className={`${style.icon} ${
          position ? style[`is_${position}`] : ""
        }`.trim()}
      >
        <Image
          src={randomValue}
          alt="Detalhe lateral da seção."
          width={150}
          height={150}
        />
      </motion.div>
    )
  );
};

export default SideIcon;
