import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

import { PropsCarousel } from "./carousel.types";
import style from "../../section.module.scss";

const Carousel = ({ images, background }: PropsCarousel) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (images.length) {
      const interval = setInterval(
        // Muda para a próxima imagem.
        () => setIndex((prevValue) => (prevValue + 1) % images.length),
        5 * 1000
      );

      // Limpa o intervalo quando desmontado.
      return () => clearInterval(interval);
    }
  }, [images]);

  return <motion.div className={style.container_img}></motion.div>;
};

export default Carousel;
