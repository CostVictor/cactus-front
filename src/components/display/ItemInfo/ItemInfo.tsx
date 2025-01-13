import { Icon } from "@iconify/react";

import { IntemInfoProps } from "./iteminfo.types";
import style from "./iteminfo.module.scss";

const ItemInfo = ({
  text,
  displayIcon,
  actionIcon,
  onClick,
}: IntemInfoProps) => {
  return (
    <div className={style.container_main} onClick={onClick}>
      {actionIcon && <Icon className={style.icon_action} icon={actionIcon} />}
      {displayIcon && (
        <Icon className={style.icon_display} icon={displayIcon} />
      )}
      <p>{text}</p>
    </div>
  );
};

export default ItemInfo;
