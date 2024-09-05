import { averiaSansLibre, yesevaOne } from "@/styles/fonts";
import { Icon } from "@iconify/react/dist/iconify.js";
import style from "./header.module.scss";
import useMobile from "@/hooks/context/useMobile";
import useAuth from "@/hooks/context/useAuth";
import Image from "next/image";
import Button from "../Button";

interface Target {
  text: string;
  link: string;
}

interface Header {
  targets?: Target[];
}

const Header = ({ targets }: Header) => {
  const auth = useAuth();
  const preview = useMobile();

  return (
    <header className={style.header}>
      <div className={style.container_logo}>
        <Image src="/icone.png" alt="Icone do cactus." width={20} height={30} />
        <h1 className={`${yesevaOne.className} ${style.title}`}>CACTUS</h1>
      </div>

      {preview.isMobile ? (
        <div className={`${style.container_content} ${style.auto_left}`}>
          <Icon icon="material-symbols:menu-rounded" className={style.icon} />
        </div>
      ) : (
        <>
          <div
            id="header-links_targets"
            className={`${style.container_content} ${style.auto_left}`}
            style={{ gap: "1.8rem" }}
          >
            {targets?.map((target) => (
              <Button
                key={`link-target_${target.text}`}
                text={target.text}
                font={averiaSansLibre.className}
                aparence="target-link"
                link={target.link}
              />
            ))}
          </div>

          {auth.isAuthenticated && (
            <div className={style.container_content}>
              {targets?.length && <hr className={style.division} />}
              <Button text="Cadastrar" link="/register" />
              <Button text="Logar" aparence="main" link="/login" />
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
