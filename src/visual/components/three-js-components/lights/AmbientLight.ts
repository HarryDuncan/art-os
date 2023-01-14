import { AmbientLight as ThreeAmbientLight } from "three";
import { AmbientLightProps } from "./lights.types";

export const AmbientLight = ({ name }: AmbientLightProps) => {
  const ambientLight = new ThreeAmbientLight(0x0016db);
  ambientLight.intensity = 0.8;
  return ambientLight;
};
