import { PointLight as ThreePointLight } from "three";
import { DEFAULT_LIGHT_COLOR } from "./lights.constants";
import { DEFAULT_VECTOR_POSITION } from "visual/consts/threejs";
import { PointLightConfig } from "./lights.types";
import { DEFAULT_LIGHT_INTENSITY } from "./lights.defaults";
import { setObjectPosition } from "visual/utils/three-dimension-space/position/setObjectPosition";

interface PointLightParameters extends PointLightConfig {
  name: string;
}
export const PointLightElement = ({
  name,
  color,
  intensity = DEFAULT_LIGHT_INTENSITY,
  position = DEFAULT_VECTOR_POSITION,
}: PointLightParameters) => {
  const pointLight = new ThreePointLight(color ?? DEFAULT_LIGHT_COLOR);
  setObjectPosition(pointLight, position);
  pointLight.name = name;
  pointLight.intensity = intensity;
  return pointLight;
};
