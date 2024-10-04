"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { listIcons, lodash } from "./sideicon.variables";
import { PropsSideIcon } from "./sideicon.types";
import { float } from "@/styles/animations";

const SideIcon = ({ position, className }: PropsSideIcon) => {
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
        className={className}
      >
        <Image src={randomValue} alt="Icone lateral" width={150} height={150} />
      </motion.div>
    )
  );
};

export default SideIcon;
