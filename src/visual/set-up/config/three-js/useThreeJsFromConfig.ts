import { ThreeJsParams } from "visual/display/hooks/use-three-js/types";
import { ThreeJSConfig } from "../config.types";
import { useMemo } from "react";
import { useCamera } from "visual/set-up/config/three-js/use-camera/useCamera";

export const useThreeJsFromConfig = (
  config: ThreeJSConfig = {}
): ThreeJsParams => {
  const { controls } = config;
  const camera = useCamera(config.camera);
  return useMemo(() => {
    return {
      camera,
      controls: formatControls(controls),
    };
  }, [camera, controls]);
};

const formatControls = (controls) => ({
  hasOrbitControls: controls?.hasOrbitControls ?? true,
});
