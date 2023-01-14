import { PointLight as ThreePointLight } from "three";
import { PointLightConfig } from "./lights.types";

export const PointLight = ({ name }: PointLightConfig) => {
  const pointLight = new ThreePointLight(0xff3300);
  pointLight.position.set(0, 0, 100);
  return pointLight;
};
