"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { PropsSection } from "./section.types";
import useMobile from "@/hooks/context/useMobile";
import Carousel from "./subcomponents/Carousel";
import SideIcon from "./subcomponents/SideIcon";
import style from "./section.module.scss";

const Section = ({
  id,
  children,
  description,
  sectionImage,
  backgroundGray,
  maxWidthContent,
  reserveAsideSpace = true,
}: PropsSection) => {
  const [viewSideIcon, setViewSideIcon] = useState<boolean>(false);
  const preview = useMobile();

  useEffect(() => {
    const handleViewSideIcon = () =>
      setViewSideIcon(window.innerWidth >= 1450 ? true : false);
    handleViewSideIcon();

    window.addEventListener("resize", handleViewSideIcon);
    return () => window.removeEventListener("resize", handleViewSideIcon);
  }, []);

  return (
    <section
      id={id}
      className={`${style.container_main} ${
        backgroundGray ? style.background_gray : ""
      } ${
        reserveAsideSpace && !preview.isMobile ? style.spaceAside : ""
      }`.trim()}
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
          {viewSideIcon && <SideIcon position="left" />}
          {description.illustrationDirection === "left" && (
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

          {description.illustrationDirection !== "left" && (
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
            !maxWidthContent ? style.limited_width : ""
          }`.trim()}
        >
          {children}
          {viewSideIcon && !maxWidthContent && <SideIcon position="right" />}
        </div>
      )}
    </section>
  );
};

export default Section;
