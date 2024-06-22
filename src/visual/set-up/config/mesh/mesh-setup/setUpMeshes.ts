import { BufferGeometry, Material, Mesh, Points } from "three";
import {
  MeshConfig,
  MESH_TYPES,
} from "visual/set-up/assets/geometry/geometry.types";
import { CustomMesh } from "../mesh.types";
import { Position3d } from "visual/utils/three-dimension-space/position/position.types";

export const setUpMeshes = (meshConfigs: MeshConfig[] = []) =>
  meshConfigs.flatMap(
    (
      { geometry, name, material, meshType, position, rotation, groupId },
      index
    ) => {
      const mesh = getMesh(geometry, material, meshType);
      if (!mesh) return [];
      formatMesh(mesh, name ?? `mesh-${index}`, position, rotation, groupId);
      return mesh;
    }
  );

const getMesh = (
  geometry: BufferGeometry,
  material: Material,
  meshType: string = MESH_TYPES.MESH
) => {
  switch (meshType) {
    case MESH_TYPES.NONE: {
      return null;
    }
    case MESH_TYPES.POINTS: {
      return new Points(geometry, material);
    }
    case MESH_TYPES.MESH:
    default:
      return new Mesh(geometry, material);
  }
};

const formatMesh = (
  mesh: CustomMesh,
  name: string,
  position?: Position3d,
  rotation?: Position3d,
  groupId?: string
) => {
  mesh.name = name;
  mesh.groupId = groupId;
  if (position) {
    const { x, y, z } = position;
    mesh.position.set(x, y, z);
  }
  if (rotation) {
    const { x, y, z } = rotation;
    mesh.rotation.set(x, y, z);
  }
};
