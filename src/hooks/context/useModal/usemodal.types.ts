import { ReactNode } from "react";

export interface PropsUseModal {
  state: {
    listModal: ReactNode[]
  }
  actions: {
    addNewModal: (modal: ReactNode) => void
    removeModal: (index: number) => void
  }
}
