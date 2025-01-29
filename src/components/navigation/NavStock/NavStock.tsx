import Link from "next/link";

import Grid from "@/components/layout/Grid";

import { PropsNavStock } from "./navstock.types";
import style from "./navstock.module.scss";

const NavStock = ({ local }: PropsNavStock) => {
  return (
    <nav className={style.container_main}>
      <h2>Estoques</h2>
      <Grid className={style.container_options}>
        {local === "snack" ? (
          <>
            {/* <Button text="Lanches" clicked /> */}
            <Link href="/stock/lunch">{/* <Button text="Almoços" /> */}</Link>
          </>
        ) : (
          <>
            <Link href="/stock/snack">{/* <Button text="Lanches" /> */}</Link>
            {/* <Button text="Almoços" clicked /> */}
          </>
        )}
      </Grid>
    </nav>
  );
};

export default NavStock;
