import { Material, Texture } from "three";
import {
  ENV_MAP_TYPES,
  MATERIAL_TYPES,
} from "../../../display/materials/materials.consts";
import { ShaderConfig } from "../../../display/materials/webgl-shaders/shaders.types";
import { BuiltShaderConfig } from "visual/display/materials/webgl-shaders/build-shader/buildShader.types";

export type MaterialType = keyof typeof MATERIAL_TYPES;
export type EnvMapType = keyof typeof ENV_MAP_TYPES;

export interface MaterialProps {
  name?: string;
  assetId?: string;
}
export type StandardMaterialProps = MaterialProps & {
  color: string;
  metalness: number;
  roughness: number;
  envMapIntensity: number;
  displacementScale: number;
  normalScale: number;
};
export type ShaderMaterialProps = MaterialProps & {
  shaderConfig: ShaderConfig;
  uniforms: MaterialUniform;
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
  | ShaderMaterialProps
  | VideoMaterialProps
  | EnvMapMaterialProps;

export interface MaterialConfig {
  id: string;
  materialType: MaterialType;
  materialProps: MaterialConfigProps;
  builtShaderConfig?: BuiltShaderConfig;
  blendingConfig?: Record<string, unknown>;
}

export type ShaderMaterial = Material & {
  uniforms: Record<string, UniformValue>;
  name: string;
};
export type MaterialUniform = Record<string, UniformValue>;
export type UniformValue = Record<"value", unknown>;
