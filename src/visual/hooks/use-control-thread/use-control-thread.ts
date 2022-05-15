import { useEffect } from "react";
import { IController } from "../use-controller/types";

export const useControlThread = (
  controller: IController,
  update: () => void,
  pause: () => void
) => {
  useEffect(() => {
    if (controller.isInitialized && controller.isRunningThread) {
      update();
    } else if (controller.isInitialized && !controller.isRunningThread) {
      pause();
    }
  }, [controller, update, pause]);
};
