import { Vector2, Vector3 } from "three";

export const defaultUniforms = (uniformConfig: Record<string, unknown>) => {
  uniformConfig.uResolution = {
    value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
      window.devicePixelRatio
    ),
  };
  uniformConfig.uPosition = {
    value: new Vector3(0, 0, 0),
  };
  return uniformConfig;
};
