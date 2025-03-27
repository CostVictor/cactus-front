"use client";

import Image from "next/image";
import clsx from "clsx";

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
      className={clsx(style.container_main, {
        [style.background_gray]: backgroundGray,
        [style.space_sidebar]: reserveSidebarSpace,
      })}
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
          className={clsx(style.container_description, {
            [style.steering_control]:
              description.illustrationDirection === "left",
          })}
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
          className={clsx(style.container_content, {
            [style.no_space_top]: description,
            [style.limited_width]: !maxWidthContent,
          })}
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
