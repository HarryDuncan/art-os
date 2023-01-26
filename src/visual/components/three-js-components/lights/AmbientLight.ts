import { AmbientLight as ThreeAmbientLight } from "three";
import { DEFAULT_LIGHT_COLOR } from "./lights.constants";
import { AmbientLightProps as LightProps } from "./lights.types";

export interface AmbientLightProps extends LightProps {
  name: string;
}
export const AmbientLight = ({ name, color }: AmbientLightProps) => {
  const ambientLight = new ThreeAmbientLight(color ?? DEFAULT_LIGHT_COLOR);
  ambientLight.intensity = 0.4;
  ambientLight.name = name;
  return ambientLight;
};
