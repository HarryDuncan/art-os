import { Geometry } from "types/threeJs.types";
import {
  InteractiveShaders,
  InteractiveShaderTypes,
  InteractiveUniform,
} from "visual/components/interactive-shaders/types";

export enum FormattedGeometryType {
  interactive = "interactive",
  standard = "standard",
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

export type FormattedGeometry = {
  geometryType: FormattedGeometryType;
  geometry: Geometry;
  materialParameters: MaterialParameters;
};
