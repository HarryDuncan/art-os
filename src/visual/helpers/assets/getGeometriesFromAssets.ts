import { getFileTypeFromFilename } from "utils/getFileType";
import { FILE_TYPES } from "consts";
import { Asset } from "visual/hooks/use-assets/types";
export type AssetGeometry = {
  geometry: any;
  name: string;
};
export const getGeometriesFromAssets = (assets: Asset[]) => {
  const geometryAssets = assets.flatMap((asset) =>
    asset.name.indexOf("geometry") !== -1 ? asset : []
  );
  if (!geometryAssets || !geometryAssets.length) {
    console.warn(
      'no geometryAssets were found - assets must have "geometry in name'
    );
    return [];
  }
  return geometryAssets.flatMap((geometry) => {
    const materialType = getFileTypeFromFilename(geometry?.url);
    switch (materialType) {
      case FILE_TYPES.MODELS.GLTF:
        return { geometry, name: geometry.name };
      case FILE_TYPES.MODELS.OBJ:
        return { geometry: getGeometryFromObj(geometry), name: geometry.name };
      default:
        return { geometry, name: geometry.name };
    }
  });
};

const getGeometryFromObj = (object) => object.data.children[0].geometry;
