import { Vector3 } from "three";

export enum LIGHT_TYPES {
  AMBIENT = "AMBIENT",
  POINT_LIGHT = "POINT_LIGHT",
  DIRECTIONAL_LIGHT = "DIRECTIONAL_LIGHT",
}
export interface LightProps {
  color?: string;
  position?: Vector3;
}
export interface AmbientLightProps extends LightProps {
  intensity?: number;
}

export interface LightConfigs {
  name: string;
  lightType: LIGHT_TYPES;
  props?: AmbientLightProps;
}
