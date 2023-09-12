import { BufferGeometry, Material, Mesh, Points } from "three";
import { ShaderMaterial } from "../material/materials.types";

export type MeshObject = Mesh<BufferGeometry, Material | Material[]>;
export type ShaderMeshObject = Mesh<BufferGeometry, ShaderMaterial>;
export type ExtendedMesh = MeshObject & { groupId?: string };
export type CustomMesh = (
  | Points<BufferGeometry, Material>
  | Mesh<BufferGeometry>
) & {
  groupId?: string;
};
