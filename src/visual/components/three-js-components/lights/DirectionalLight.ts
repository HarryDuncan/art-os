import { DirectionalLight as ThreeDirectionalLight } from "three";
import { DirectionalLightProps } from "./lights.types";

export const DirectionalLight = ({ name }: DirectionalLightProps) => {
  const light = new ThreeDirectionalLight(0xd60000);
  light.position.set(0.5, 0.5, 1);
  return light;
};
