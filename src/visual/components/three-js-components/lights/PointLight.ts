import { PointLight as ThreePointLight } from "three";
import { DEFAULT_LIGHT_COLOR } from "./lights.constants";
import { DEFAULT_VECTOR_POSITION } from "consts/threejs";
import { setObjectPosition } from "visual/helpers/three-dimension-space/position/setObjectPosition";
import { PointLightConfig } from "./lights.types";
import { DEFAULT_LIGHT_INTENSITY } from "./lights.defaults";

interface PointLightParameters extends PointLightConfig {
  name: string;
}
export const PointLight = ({
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
