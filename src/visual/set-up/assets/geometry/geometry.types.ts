import { BufferGeometry, Material } from "three";
import { Geometry } from "types/threeJs.types";
import { ThreeDPosition } from "visual/display/helpers/three-dimension-space/position/position.types";

export const MESH_TYPES = {
  MESH: "MESH",
  POINTS: "POINTS",
};
export type MeshType = keyof typeof MESH_TYPES;

export interface FormattedGeometry {
  geometry: Geometry;
  position?: ThreeDPosition;
  rotation?: ThreeDPosition;
  name?: string;
  groupId?: string;
}
export type MeshConfig = FormattedGeometry & {
  material: Material;
  meshType?: MeshType;
};

export type AssetGeometry = {
  geometry: BufferGeometry;
  name: string;
};

export type GeometryConfig = {
  scale: number;
  centerMesh?: boolean;
  subdivision?: {
    subdivisionProps?: SubdivisionProps;
    subdevisionIterations?: number;
  };
};

export type SubdivisionProps = {
  split?: boolean;
  uvSmooth?: boolean;
  preserveEdges?: boolean;
  flatOnly?: boolean;
  maxTriangles?: number;
};
