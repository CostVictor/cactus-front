import { Icon } from "@iconify/react";
import clsx from "clsx";

import { PropsLabelController } from "./labelcontroller.types";
import { nameIcons } from "./labelcontroller.variables";
import style from "./labelcontroller.module.scss";

const LabelController = ({ labels }: PropsLabelController) => {
  return (
    labels.length > 0 && (
      <div className={style.container_main}>
        {labels.map((label, index) => (
          <div key={index} className={style.container_msg_label}>
            {label.type && label.type !== "normal" && (
              <Icon
                icon={nameIcons[label.type]}
                className={clsx(style.icon, style[label.type])}
              />
            )}
            <p
              title={label.text}
              className={clsx(style.label, {
                [style[label.type ?? ""]]:
                  label.type === "pending" || label.type === "success",
              })}
            >
              {label.text}
            </p>
          </div>
        ))}
      </div>
    )
  );
};

export default LabelController;
