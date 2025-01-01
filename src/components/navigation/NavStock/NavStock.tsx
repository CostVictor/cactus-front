import Link from "next/link";

import Container from "@/components/layout/Container";
import Button from "@/components/forms/Button";

import { PropsNavStock } from "./navstock.types";
import style from "./navstock.module.scss";

const NavStock = ({ local }: PropsNavStock) => {
  return (
    <nav className={style.container_main}>
      <h2>Estoques</h2>
      <Container className={style.container_options}>
        {local === "snacks" ? (
          <>
            <Button text="Lanches" clicked />
            <Link href="/stock/dishes">
              <Button text="Almoços" />
            </Link>
          </>
        ) : (
          <>
            <Link href="/stock/snacks">
              <Button text="Lanches" />
            </Link>
            <Button text="Almoços" clicked />
          </>
        )}
      </Container>
    </nav>
  );
};

export default NavStock;
