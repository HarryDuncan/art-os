import { Vector2 } from "three";

export const defaultUniforms = (uniformConfig: Record<string, unknown>) => {
  uniformConfig.uResolution = {
    value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
      window.devicePixelRatio
    ),
  };
  return uniformConfig;
};
