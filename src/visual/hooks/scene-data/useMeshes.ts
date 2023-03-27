import { useAppSelector } from "app/redux/store";
import { useMemo } from "react";
import { Mesh, Points } from "three";
import { Geometry } from "types/threeJs.types";
import {
  MeshConfig,
  MeshTypes,
} from "visual/helpers/assets/geometry/geometry.types";
import { getMaterial } from "visual/helpers/materials/getMaterial";
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
      (
        {
          geometry,
          name,
          materialType,
          materialParameters,
          meshType,
          position,
          rotation,
        },
        index
      ) => {
        const material = getMaterial(
          materialParameters,
          materialType,
          interactions,
          materialFunctions
        );
        const mesh = getMesh(geometry, material, meshType);
        formatMesh(mesh, position, rotation, name ?? `mesh-${index}`);
        // TODO - add events to mesh
        return mesh;
      }
    );
  }, [meshConfigs]);
};

const getMesh = (geometry: Geometry, material, meshType?: MeshTypes) => {
  switch (meshType) {
    case MeshTypes.POINTS:
      return new Points(geometry, material);
    case MeshTypes.MESH:
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
