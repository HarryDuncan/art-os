import { BufferGeometry, Material, Mesh } from "three";

export type MeshObject = Mesh<BufferGeometry, Material | Material[]>;
export type ExtendedMesh = MeshObject & { groupId?: string };
