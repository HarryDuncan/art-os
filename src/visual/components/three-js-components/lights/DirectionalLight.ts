import { DirectionalLight as ThreeDirectionalLight } from "three";
import { DEFAULT_LIGHT_COLOR } from "./lights.constants";
import { DirectionalLightConfig } from "./lights.types";
import { setObjectPosition } from "visual/helpers/three-dimension-space/position/setObjectPosition";
import { DEFAULT_VECTOR_POSITION } from "consts/threejs";

interface DirectionalLightParameters extends DirectionalLightConfig {
  name: string;
}
export const DirectionalLight = ({
  name,
  color,
  position = DEFAULT_VECTOR_POSITION,
}: DirectionalLightParameters) => {
  const light = new ThreeDirectionalLight(color ?? DEFAULT_LIGHT_COLOR);
  setObjectPosition(light, position);
  light.intensity = 1;
  light.name = name;
  return light;
};
