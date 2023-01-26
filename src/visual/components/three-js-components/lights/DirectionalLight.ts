import { DirectionalLight as ThreeDirectionalLight } from "three";
import { DEFAULT_LIGHT_COLOR } from "./lights.constants";
import { LightProps } from "./lights.types";

export interface DirectionalLightProps extends LightProps {
  name: string;
}
export const DirectionalLight = ({ name, color }: DirectionalLightProps) => {
  const light = new ThreeDirectionalLight(color ?? DEFAULT_LIGHT_COLOR);
  light.position.set(0.5, 0.5, 1);
  light.name = name;
  return light;
};
