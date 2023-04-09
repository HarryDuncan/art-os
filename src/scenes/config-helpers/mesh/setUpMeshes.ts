import { Mesh, Points } from "three";
import { Geometry } from "types/threeJs.types";
import {
  MESH_TYPES,
  MeshConfig,
  MeshType,
} from "utils/assets/geometry/geometry.types";

export const setUpMeshes = (meshConfigs: MeshConfig[] = []) => {
  return meshConfigs.flatMap(
    ({ geometry, name, material, meshType, position, rotation }, index) => {
      const mesh = getMesh(geometry, material, meshType);
      formatMesh(mesh, position, rotation, name ?? `mesh-${index}`);
      return mesh;
    }
  );
};

const getMesh = (geometry: Geometry, material, meshType?: MeshType) => {
  switch (meshType) {
    case MESH_TYPES.POINTS:
      return new Points(geometry, material);
    case MESH_TYPES.MESH:
    default:
      return new Mesh(geometry, material);
  }
};

const formatMesh = (mesh, position, rotation, name) => {
  mesh.name = name;
  if (position) {
    const { x, y, z } = position;
    mesh.position.set(x, y, z);
  }
  if (rotation) {
    const { x, y, z } = rotation;
    mesh.rotation.set(x, y, z);
  }
};
