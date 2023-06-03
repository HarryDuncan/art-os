import { getFileTypeFromFilename } from "utils/getFileType";
import { FILE_TYPES } from "consts";
import { Vector3 } from "three";
import { GeometryConfig } from "./geometry.types";
import { Asset, LoadedGroup, LoadedObjChild } from "../use-assets/types";

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
  const geometries = geometryAssets.flatMap((geometryAsset) => {
    const modelFileType = getFileTypeFromFilename(geometryAsset?.url);
    switch (modelFileType) {
      case FILE_TYPES.MODELS.OBJ:
        return getObjectGeometries(geometryAsset);
      default:
        console.warn(`no formatting for ${modelFileType}`);
        return [];
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

const getObjectGeometries = (geometryAsset: Asset) => {
  const { children } = geometryAsset.data as LoadedGroup;
  if (children.length) {
    return children.map((child: LoadedObjChild) => ({
      name: child.name,
      geometry: child.geometry,
    }));
  }
  console.warn(`geometry not valid ${geometryAsset.name}`);
  return [];
};
