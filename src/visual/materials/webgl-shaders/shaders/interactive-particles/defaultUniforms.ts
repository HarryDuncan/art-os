import { Vector2 } from "three";

export const defaultUniforms = (uniformConfig) => {
  uniformConfig.uTextureSize.value = new Vector2(640, 480);
  uniformConfig.uPosition.value = new Vector2(-1.5, 1);
  uniformConfig.uResolution.value = new Vector2(
    window.innerWidth,
    window.innerHeight
  ).multiplyScalar(window.devicePixelRatio);
  return uniformConfig;
};
