import { Vector2, Vector3, Vector4 } from "three";

export const defaultUniforms = (uniformConfig: Record<string, unknown>) => {
  uniformConfig.uTextureSize = { value: new Vector2(640, 480) };
  uniformConfig.uPosition = { value: new Vector2(-1.5, 1) };
  if (uniformConfig.uRotation) {
    uniformConfig.uRotation = { value: new Vector3(0, 0, 0) };
  }
  uniformConfig.uResolution = {
    value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
      window.devicePixelRatio
    ),
  };
  uniformConfig.uEffectTranslation = { value: new Vector4(0, 0, 0, 0) };

  return uniformConfig;
};
