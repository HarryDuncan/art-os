import { DEFAULT_POSITION } from "consts/threejs";
import { Texture } from "three";
import { getGeometriesFromAssets } from "visual/helpers/assets/getGeometriesFromAssets";
import { formatImportedGeometry } from "visual/helpers/geometry/formatImportedGeometry";
import {
  MATERIAL_TYPES,
  MeshConfig,
} from "visual/helpers/geometry/three-geometry/types";
import { createBoundingBox } from "visual/helpers/three-dimension-space/createBoundingBox";
import { getRandomCoordinatesInBoundingBoxes } from "visual/helpers/three-dimension-space/position/getRandomCoordsBoundingBoxes";
import { BoundingBox } from "visual/helpers/three-dimension-space/position/position.types";
import { Asset } from "visual/hooks/use-assets/types";
import { TEXT_BBOX_SCHEMA } from "../ltw2.constants";

export const getMeshConfigs = (
  loadedAssets: Asset[],
  mirrorExclusionZones: BoundingBox[]
): MeshConfig[] => {
  const geometries = getGeometriesFromAssets(loadedAssets).map((geometry) => ({
    geometry: formatImportedGeometry(geometry.geometry, 0.007),
    name: geometry.name,
  }));

  const textBBox = createBoundingBox(
    DEFAULT_POSITION,
    TEXT_BBOX_SCHEMA.width,
    TEXT_BBOX_SCHEMA.height,
    TEXT_BBOX_SCHEMA.depth
  );
  mirrorExclusionZones.push(textBBox);
  mirrorExclusionZones.push(createBoundingBox({ x: 0, y: 0, z: 3 }, 6, 5, 12));
  const allowedBoundingBoxes: BoundingBox[] = [
    createBoundingBox({ x: 0, y: 0, z: 0 }, 13, 10, 10),
  ];
  const coordinates = getRandomCoordinatesInBoundingBoxes(
    allowedBoundingBoxes,
    mirrorExclusionZones,
    4
  );

  const matcaps = loadedAssets.flatMap((asset) =>
    asset.name.indexOf("matcap") !== -1 ? asset : []
  );
  return coordinates.map((coordinates, index) => ({
    materialType: MATERIAL_TYPES.matcap,
    geometry: geometries[0].geometry,
    name: `${geometries[0].name}-${index}`,
    position: coordinates,
    materialParameters: {
      matcap: (matcaps[0].data as Texture) ?? null,
    },
  }));
};
