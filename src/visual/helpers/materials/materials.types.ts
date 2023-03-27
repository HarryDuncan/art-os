import { Texture } from "three";
import { InteractiveShaderType } from "visual/components/interactive/shaders/shaders.types";
import { Shaders, Uniform } from "visual/shaders/shaders.types";
import { ENV_MAP_TYPES, MATERIAL_TYPES } from "./materials.constants";

export type MaterialType = keyof typeof MATERIAL_TYPES;
export type EnvMapType = keyof typeof ENV_MAP_TYPES;
export interface MaterialParameters {
  name?: string;
  materialType?: MaterialType;
}

export type StandardShaderMaterialParameters = MaterialParameters & {
  shaders: Shaders;
  uniforms: Uniform;
};

export type InteractiveMaterialParameters = StandardShaderMaterialParameters & {
  shaderType: InteractiveShaderType;
};

export type StandardMaterialTypes = MaterialParameters & {
  material?: any;
};

export type MatcapMaterialParameters = MaterialParameters & {
  matcap: Texture | null;
};

export type EnvMapMaterialParameters = MaterialParameters & {
  envMapType: EnvMapType;
  imageUrl: string;
};

export type VideoMaterialParameters = MaterialParameters & {
  videoId: string;
};
export type MaterialParameterTypes =
  | MatcapMaterialParameters
  | StandardMaterialTypes
  | InteractiveMaterialParameters
  | VideoMaterialParameters
  | EnvMapMaterialParameters;
