import { ThreeJSConfig } from "../config.types";
import { getPosition } from "../utils/position";

export const getThreeJsFromConfig = (config: ThreeJSConfig) => {
  const { camera, controls } = config;
  return {
    camera: formatCamera(camera),
    controls: formatControls(controls),
  };
};

const formatControls = (controls) => ({
  hasOrbitControls: controls?.hasOrbitControls ?? true,
});

const formatCamera = (camera) => ({
  position: getPosition(camera?.position ?? {}),
});
