import { PointLight as ThreePointLight } from "three";
import { DEFAULT_LIGHT_COLOR } from "./lights.constants";
import { LightProps } from "./lights.types";

export interface PointLightProps extends LightProps {
  name: string;
}
export const PointLight = ({ name, color }: PointLightProps) => {
  const pointLight = new ThreePointLight(color ?? DEFAULT_LIGHT_COLOR);
  pointLight.position.set(0, 0, 100);
  pointLight.name = name;
  return pointLight;
};
