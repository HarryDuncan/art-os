import { useEffect } from "react";
import { IController } from "../use-controller/types";

export const useControlThread = (
  controller: IController,
  update: () => void,
  pause: () => void
) => {
  useEffect(() => {
    if (controller.isSceneInitialized && controller.isRunningThread) {
      setTimeout(() => {
        update();
      }, 5000);
    } else if (controller.isSceneInitialized && !controller.isRunningThread) {
      pause();
    }
  }, [controller, update, pause]);
};
