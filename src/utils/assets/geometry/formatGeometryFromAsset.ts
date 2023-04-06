import { getFileTypeFromFilename } from "utils/getFileType";
import { FILE_TYPES } from "consts";
import { Asset } from "utils/assets/use-assets/types";
import { Vector3 } from "three";
import { GeometryConfig } from "./geometry.types";

export const formatGeometriesFromAsset = (
  assets: Asset[],
  geometryConfig?: GeometryConfig
) => {
  const geometryAssets = assets.flatMap((asset: Asset) => {
    return asset.name.indexOf("geometry") !== -1 ? asset : [];
  });
  if (!geometryAssets || !geometryAssets.length) {
    console.warn(
      'no geometryAssets were found - assets must have "geometry in name'
    );
    return [];
  }
  const geometries = geometryAssets.flatMap((geometry) => {
    const materialType = getFileTypeFromFilename(geometry?.url);
    switch (materialType) {
      case FILE_TYPES.MODELS.OBJ:
        return { geometry: getGeometryFromObj(geometry), name: geometry.name };
      case FILE_TYPES.MODELS.GLTF:
      default:
        return { geometry, name: geometry.name };
    }
  });
  return geometries.map(({ geometry, name }) => ({
    geometry: formatImportedGeometry(geometry, geometryConfig?.scale),
    name,
  }));
};

export const formatImportedGeometry = (geometry, scale = 0.15) => {
  const formattedGeometry = geometry.clone();
  formattedGeometry.computeBoundingBox();
  const size = new Vector3();
  formattedGeometry.boundingBox.getSize(size);
  formattedGeometry.scale(scale, scale, scale);
  return formattedGeometry;
};

const getGeometryFromObj = (object) => {
  if (object.data.children[0]) {
    return object.data.children[0].geometry;
  }
  console.warn(`geometry not valid ${object.name}`);
  return null;
};
