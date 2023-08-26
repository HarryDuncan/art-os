import { BufferGeometry, Material, Mesh, Points } from "three";

export type MeshObject = Mesh<BufferGeometry, Material | Material[]>;
export type ExtendedMesh = MeshObject & { groupId?: string };
export type CustomMesh = (
  | Points<BufferGeometry, Material>
  | Mesh<BufferGeometry>
) & {
  groupId?: string;
};
