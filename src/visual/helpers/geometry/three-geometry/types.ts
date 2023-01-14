import { Texture } from "three";
import { Geometry } from "types/threeJs.types";
import {
  InteractiveShaders,
  InteractiveShaderTypes,
  InteractiveUniform,
} from "visual/components/interactive-shaders/types";

export enum MATERIAL_TYPES {
  interactive = "interactive",
  standardShader = "standardShader",
  standard = "standard",
  matcap = "matcap",
}

export type InteractiveMaterialParameters = {
  shaderType: InteractiveShaderTypes;
  shaders: InteractiveShaders;
  uniforms: InteractiveUniform;
};

export type StandardMaterialTypes = {
  material?: any;
};

export type MatcapMaterialParameters = {
  matcap: Texture | null;
};

export type MaterialParameters =
  | StandardMaterialTypes
  | InteractiveMaterialParameters
  | MatcapMaterialParameters;

export enum MeshTypes {
  MESH = "mesh",
  POINTS = "points",
}
export type MeshConfig = {
  materialType: MATERIAL_TYPES;
  geometry: Geometry;
  materialParameters: MaterialParameters;
  position?: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  meshType?: MeshTypes;
  name?: string;
};
