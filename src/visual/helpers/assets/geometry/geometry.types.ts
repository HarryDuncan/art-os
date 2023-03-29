import { Material } from "three";
import { Geometry } from "types/threeJs.types";
import {
  InteractiveMaterialParameters,
  MatcapMaterialParameters,
  MaterialType,
  StandardMaterialTypes,
} from "visual/helpers/materials/materials.types";

export type MaterialParameters =
  | StandardMaterialTypes
  | InteractiveMaterialParameters
  | MatcapMaterialParameters;

export enum MeshTypes {
  MESH = "mesh",
  POINTS = "points",
}

export interface FormattedGeometry {
  geometry: Geometry;
  position?: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  name?: string;
}
export type MeshConfig = FormattedGeometry & {
  material: Material;
  meshType?: MeshTypes;
};

export type AssetGeometry = {
  geometry: any;
  name: string;
};

export type GeometryConfig = {
  scale: number;
  name?: string;
};
