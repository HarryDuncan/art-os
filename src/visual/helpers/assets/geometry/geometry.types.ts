import { Material, Vector3 } from "three";
import { Geometry } from "types/threeJs.types";

export const MESH_TYPES = {
  MESH: "MESH",
  POINTS: "POINTS",
};
export type MeshType = keyof typeof MESH_TYPES;

export interface FormattedGeometry {
  geometry: Geometry;
  position?: Vector3;
  rotation?: Vector3;
  name?: string;
}
export type MeshConfig = FormattedGeometry & {
  material: Material;
  meshType?: MeshType;
};

export type AssetGeometry = {
  geometry: any;
  name: string;
};

export type GeometryConfig = {
  scale: number;
  name?: string;
};
