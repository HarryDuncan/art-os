import { useCallback, useState } from "react";
import { IController } from "./types";

interface UseControllerProps {
  initializeTimeoutOffset?: number;
}

export const useController = ({
  initializeTimeoutOffset = 1000,
}: UseControllerProps) => {
  const initialController = {
    isFrameworkInitialized: false,
    isAssetsInitialized: false,
    isSceneInitialized: false,
    isRunningThread: false,
  };
  const [controller, updateController] = useState<IController>(
    initialController
  );

  const onFrameworkInitialized = () => {
    updateController({ ...controller, isFrameworkInitialized: true });
  };

  const onAssetsInitialized = () => {
    updateController({ ...controller, isAssetsInitialized: true });
  };

  const onSceneInitialized = () => {
    updateController({
      ...controller,
      isSceneInitialized: true,
      isRunningThread: true,
    });
  };

  return {
    controller,
    updateController,
    onSceneInitialized,
    onAssetsInitialized,
    onFrameworkInitialized,
  };
};
