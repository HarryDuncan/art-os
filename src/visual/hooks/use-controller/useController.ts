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

  const onFrameworkInitialized = useCallback(() => {
    setTimeout(() => {
      updateController({ ...controller, isFrameworkInitialized: true });
    }, initializeTimeoutOffset);
  }, []);

  const onAssetsInitialized = useCallback(() => {
    setTimeout(() => {
      updateController({ ...controller, isAssetsInitialized: true });
    }, initializeTimeoutOffset);
  }, []);

  const onSceneInitialized = useCallback(() => {
    setTimeout(() => {
      updateController({
        ...controller,
        isSceneInitialized: true,
        isRunningThread: true,
      });
    }, initializeTimeoutOffset);
  }, []);

  return {
    controller,
    updateController,
    onSceneInitialized,
    onAssetsInitialized,
    onFrameworkInitialized,
  };
};
