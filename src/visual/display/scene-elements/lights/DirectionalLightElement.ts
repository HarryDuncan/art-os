import { DirectionalLight as ThreeDirectionalLight } from "three";
import { DEFAULT_LIGHT_COLOR } from "./lights.constants";
import { DirectionalLightConfig } from "./lights.types";
import { DEFAULT_VECTOR_POSITION } from "visual/consts/threejs";
import { setObjectPosition } from "visual/display/helpers/three-dimension-space/position/setObjectPosition";

interface DirectionalLightParameters extends DirectionalLightConfig {
  name: string;
}
export const DirectionalLightElement = ({
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
