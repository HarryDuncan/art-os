import { useCallback, useState } from "react";
import { IController } from "./types";

interface UseControllerProps {
  initializeTimeoutOffset?: number;
}

export const useController = ({
  initializeTimeoutOffset = 1000,
}: UseControllerProps) => {
  const initialController = { isInitialized: false, isRunningThread: false };
  const [controller, updateController] = useState<IController>(
    initialController
  );

  const onSceneInitialized = useCallback(() => {
    setTimeout(() => {
      updateController({
        ...controller,
        isInitialized: true,
        isRunningThread: true,
      });
    }, initializeTimeoutOffset);
  }, []);
  return { controller, updateController, onSceneInitialized };
};
