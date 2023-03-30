import { useAppSelector } from "app/redux/store";
import { useMemo } from "react";
import { Mesh, Points } from "three";
import { Geometry } from "types/threeJs.types";
import {
  MeshConfig,
  MeshType,
  MESH_TYPES,
} from "visual/helpers/assets/geometry/geometry.types";
import { InteractionEventObject } from "../../helpers/interactions/types";

export const useMeshes = (
  meshConfigs: MeshConfig[] = [],
  interactions: InteractionEventObject[] = []
) => {
  const {
    visualData: { materialFunctions },
  } = useAppSelector((state) => state.visual);
  return useMemo(() => {
    return meshConfigs.flatMap(
      ({ geometry, name, material, meshType, position, rotation }, index) => {
        const mesh = getMesh(geometry, material, meshType);
        formatMesh(mesh, position, rotation, name ?? `mesh-${index}`);
        // TODO - add events to mesh
        return mesh;
      }
    );
  }, [meshConfigs]);
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
    console.log(x, y, z);
    mesh.rotation.set(x, y, z);
  }
};
