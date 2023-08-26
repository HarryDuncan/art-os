import { TextureLoader, Vector2 } from "three";

export const defaultUniforms = (uniformConfig: Record<string, unknown>) => {
  uniformConfig.uResolution = {
    value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
      window.devicePixelRatio
    ),
  };
  uniformConfig.uMouse = {
    value: new Vector2(
      0.7 * window.innerWidth,
      window.innerHeight
    ).multiplyScalar(window.devicePixelRatio),
  };
  uniformConfig.uPosition = { value: new Vector2(0, 0) };
  const textureLoader = new TextureLoader();
  uniformConfig.uTextureZero = {
    value: textureLoader.load("../assets/textures/point-textures/0.png"),
  };
  return uniformConfig;
};
