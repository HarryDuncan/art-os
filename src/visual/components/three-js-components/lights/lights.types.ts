import { Vector3 } from "three";

export const LIGHT_TYPES = {
  AMBIENT: "AMBIENT",
  POINT_LIGHT: "POINT_LIGHT",
  DIRECTIONAL_LIGHT: "DIRECTIONAL_LIGHT",
};

export type LightType = keyof typeof LIGHT_TYPES;
export interface LightProps {
  color?: string;
  position?: Vector3;
}
export interface AmbientLightProps extends LightProps {
  intensity?: number;
}

export interface LightConfigs {
  name: string;
  lightType: LightType;
  props?: AmbientLightProps;
}
