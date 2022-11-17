import { getFileTypeFromFilename } from "utils/getFileType";
import { FILE_TYPES } from "consts";
import { Asset } from "visual/hooks/use-assets/types";

export const getGeometriesFromAssets = (assets: Asset[]) => {
  const geometries = assets.flatMap((asset) =>
    asset.name.indexOf("geometry") !== -1 ? asset : []
  );
  if (!geometries) return [];
  return geometries.flatMap((geometry) => {
    const geometryType = getFileTypeFromFilename(geometry?.url);
    switch (geometryType) {
      case FILE_TYPES.MODELS.GLTF:
        return geometry;
      case FILE_TYPES.MODELS.OBJ:
        return getGeometryFromObj(geometry);
      default:
        return geometry;
    }
  });
};

const getGeometryFromObj = (object) => object.data.children[0].geometry;
