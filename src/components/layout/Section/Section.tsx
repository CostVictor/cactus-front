"use client";

import Image from "next/image";

import Carousel from "./subcomponents/Carousel";
import SideIcon from "@/components/interface/SideIcon";

import { PropsSection } from "./section.types";
import style from "./section.module.scss";

const Section = ({
  id,
  children,
  description,
  sectionImage,
  backgroundGray,
  maxWidthContent,
  reserveSidebarSpace = true,
}: PropsSection) => {
  return (
    <section
      id={id}
      className={`${style.container_main} ${
        backgroundGray ? style.background_gray : ""
      } ${reserveSidebarSpace ? style.space_sidebar : ""}`.trim()}
    >
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
              priority
              fill
            />
          </div>
        ))}

      {description && (
        <div
          className={`${style.container_description} ${
            description.illustrationDirection === "left"
              ? style.steering_control
              : ""
          }`.trim()}
        >
          <SideIcon
            position="left"
            className={`${style.icon} ${style.is_left}`}
          />

          {description.illustrationDirection === "left" &&
            description.illustrationUrl && (
              <Image
                className={style.illustration}
                src={description.illustrationUrl}
                alt="Ilustração da seção."
                width={290}
                height={290}
              />
            )}

          <div className={style.container_text}>
            <h2 className={style.title}>{description.title}</h2>
            <p className={style.text}>{description.text}</p>
          </div>

          {description.illustrationDirection !== "left" &&
            description.illustrationUrl && (
              <Image
                className={style.illustration}
                src={description.illustrationUrl}
                alt="Ilustração da seção."
                width={290}
                height={290}
              />
            )}
        </div>
      )}

      {children && (
        <div
          className={`${style.container_content} ${
            description ? style.no_space_top : ""
          } ${!maxWidthContent ? style.limited_width : ""}`.trim()}
        >
          {children}
          {!maxWidthContent && (
            <SideIcon
              position="right"
              className={`${style.icon} ${style.is_right}`}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default Section;
