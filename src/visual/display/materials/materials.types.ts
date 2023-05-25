import { Texture, Uniform } from "three";
import { ENV_MAP_TYPES, MATERIAL_TYPES } from "./materials.constants";
import { ShaderConfig } from "./webgl-shaders/shaders.types";

export type MaterialType = keyof typeof MATERIAL_TYPES;
export type EnvMapType = keyof typeof ENV_MAP_TYPES;

export interface MaterialProps {
  name?: string;
}
export type InteractiveShaderProps = ShaderMaterialProps;

export type ShaderMaterialProps = MaterialProps & {
  shaderConfig: ShaderConfig;
  uniforms: Uniform;
};

export type StandardMaterialTypes = MaterialProps & {
  material?: any;
};

export type MatcapMaterialProps = MaterialProps & {
  matcap: Texture | null;
};

export type EnvMapMaterialProps = MaterialProps & {
  envMapType: EnvMapType;
  imageUrl: string;
};

export type VideoMaterialProps = MaterialProps & {
  videoId: string;
};
export type PhongMaterialProps = MaterialProps & {
  color: string;
  specular?: number;
  shininess: number;
};
export type MaterialConfigProps =
  | MatcapMaterialProps
  | StandardMaterialTypes
  | ShaderMaterialProps
  | VideoMaterialProps
  | EnvMapMaterialProps;

export interface MaterialConfig {
  id: string;
  materialType: MaterialType;
  materialProps: MaterialConfigProps;
  materialById?: string;
}