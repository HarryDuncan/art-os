import { ThreeJsParams } from "visual/display/hooks/use-three-js/types";
import { ControlConfig, ThreeJSConfig } from "../config.types";
import { useMemo } from "react";
import { useCamera } from "visual/set-up/config/three-js/use-camera/useCamera";

export const useThreeJsFromConfig = (
  config: ThreeJSConfig = {}
): ThreeJsParams => {
  const camera = useCamera(config.camera);
  const controls = useControls(config.controls);
  return useMemo(() => {
    return {
      camera,
      controls,
    };
  }, [camera, controls]);
};

const useControls = (controlsConfig?: Partial<ControlConfig>) =>
  useMemo(
    () =>
      controlsConfig
        ? {
            ...controlsConfig,
          }
        : undefined,
    [controlsConfig]
  );
