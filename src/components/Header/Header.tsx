import { yesevaOne } from "@/styles/fonts"; 
import style from "./header.module.scss";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import Button from "../Button";

const Header = () => {
  const auth = useAuth();

  return (
    <header className={style.header}>
      <div className={style.container_logo}>
        <Image src="/icone.png" alt="Icone do cactus." width={20} height={30} />
        <h1 className={`${yesevaOne.className} ${style.title}`}>CACTUS</h1>
      </div>

      <div className={style.container_content + ` ${style.auto_left}`}>
        <Button text="Cadastrar" url="/register" />
        <Button text="Logar" aparence="main" url="/login" />
      </div>
    </header>
  );
};

export default Header;
