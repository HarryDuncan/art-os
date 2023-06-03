import { ThreeJSConfig } from "../config.types";
import { getPosition } from "../utils/position";

export const getThreeJsFromConfig = (config: ThreeJSConfig) => {
  const { camera, controls } = config;
  console.log(config);
  const cameraConfig = formatCamera(camera);
  return {
    camera: cameraConfig,
    controls,
  };
};

const formatCamera = (camera) => {
  return {
    position: getPosition(camera?.position ?? {}),
  };
};
