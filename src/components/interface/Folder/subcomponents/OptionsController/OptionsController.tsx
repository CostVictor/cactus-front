import { Icon } from "@iconify/react";

import { PropsOptionsControler } from "./optionscontroller.types";
import style from "./optionscontroller.module.scss";

const OptionsController = ({
  toggleOpenFolder,
  isOpen,
  config,
}: PropsOptionsControler) => {
  return (
    <div className={style.container}>
      {config.canMinimize && (
        <Icon
          className={style.icon}
          onClick={toggleOpenFolder}
          icon={
            isOpen
              ? "material-symbols:arrow-drop-down-rounded"
              : "material-symbols:arrow-right-rounded"
          }
        />
      )}
    </div>
  );
};

export default OptionsController;
