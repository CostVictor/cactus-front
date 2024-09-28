"use client";

import Image from "next/image";
import { PropsSection } from "./section.types";
import useMobile from "@/hooks/context/useMobile";
import style from "./section.module.scss";

const Section = ({
  id,
  image = "",
  description,
  observeAside = true,
  children,
}: PropsSection) => {
  const preview = useMobile();

  return (
    <section
      id={id}
      className={`${style.container_main} ${
        observeAside && !preview.isMobile ? style.space_left : ""
      }`.trim()}
    >
      <div className={style.body}>
        {image ? "imagem": null}
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

        <div className={style.container_content}>{children}</div>
      </div>
    </section>
  );
};

export default Section;
