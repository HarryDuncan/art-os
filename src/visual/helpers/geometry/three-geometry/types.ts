import { Geometry } from "types/threeJs.types";
import {
  InteractiveShaders,
  InteractiveShaderTypes,
  InteractiveUniform,
} from "visual/components/interactive-shaders/types";

export enum FormattedGeometryType {
  interactive = "interactive",
  standard = "standard",
  standardShader = "standardShader",
}

export type InteractiveMaterialParameters = {
  shaderType: InteractiveShaderTypes;
  shaders: InteractiveShaders;
  uniforms: InteractiveUniform;
};

export type StandardMaterialTypes = {
  material?: any;
};

export type MaterialParameters =
  | StandardMaterialTypes
  | InteractiveMaterialParameters;

export enum MeshTypes {
  MESH = "mesh",
  POINTS = "points",
}
export type FormattedGeometry = {
  geometryType: FormattedGeometryType;
  geometry: Geometry;
  materialParameters: MaterialParameters;
  position?: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  meshType?: MeshTypes;
  name?: string;
};
