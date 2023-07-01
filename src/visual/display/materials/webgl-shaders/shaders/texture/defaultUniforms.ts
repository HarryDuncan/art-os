import { Vector2 } from "three";

export const defaultUniforms = (uniformConfig) => {
  uniformConfig.uResolution = {
    value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
      window.devicePixelRatio
    ),
  };
  return uniformConfig;
};
