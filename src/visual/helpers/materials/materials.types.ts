import { Texture } from "three";
import { InteractiveShaderType } from "visual/components/interactive/shaders/shaders.types";
import { Shaders, Uniform } from "visual/shaders/shaders.types";
import { ENV_MAP_TYPES, MATERIAL_TYPES } from "./materials.constants";

export type MaterialType = keyof typeof MATERIAL_TYPES;
export type EnvMapType = keyof typeof ENV_MAP_TYPES;

export interface MaterialProps {
  name?: string;
}

export type StandardShaderMaterialProps = MaterialProps & {
  shaders: Shaders;
  uniforms: Uniform;
};

export type InteractiveMaterialProps = StandardShaderMaterialProps & {
  shaderType: InteractiveShaderType;
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
  | InteractiveMaterialProps
  | VideoMaterialProps
  | EnvMapMaterialProps;

export interface MaterialConfig {
  id: string;
  materialType: MaterialType;
  materialProps: MaterialConfigProps;
  materialById?: string;
}
