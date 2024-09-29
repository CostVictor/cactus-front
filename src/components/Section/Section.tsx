"use client";

import Image from "next/image";
import { PropsSection } from "./section.types";
import useMobile from "@/hooks/context/useMobile";
import Carousel from "./subcomponents/Carousel";
import style from "./section.module.scss";

const Section = ({
  id,
  children,
  description,
  sectionImage,
  backgroundColor,
  observeAside = true,
}: PropsSection) => {
  const preview = useMobile();

  return (
    <section
      id={id}
      className={`${style.container_main} ${
        observeAside && !preview.isMobile ? style.space_left : ""
      }`.trim()}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={style.body}>
        {sectionImage &&
          (sectionImage.viewImages ? (
            <Carousel
              images={sectionImage.viewImages}
              background={sectionImage.background}
            />
          ) : (
            <div className={style.container_img}>
              <Image
                src={sectionImage.background}
                className={style.img}
                alt="Imagem da seção."
                fill
              />
            </div>
          ))}

        {description && (
          <div className={style.container_description}>
            <div className={style.container_text}>
              <h2 className={style.title}>{description.title}</h2>
              <p className={style.text}>{description.text}</p>
            </div>

            <Image
              src={description.illustrationUrl}
              alt="Ilustração da seção."
              width={290}
              height={290}
            />
          </div>
        )}

        {children && <div className={style.container_content}>{children}</div>}
      </div>
    </section>
  );
};

export default Section;
